// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import '../Roles/Farmer.sol';
import '../Roles/Distributor.sol';
import '../Roles/Retailer.sol';
import '../Roles/Consumer.sol';
import '../consensus/verify_random.sol';

contract SupplyChain is Farmer, Distributor, Retailer, Consumer, verify_random{

    mapping(address => uint) rep_score;

    enum State{
        Harvested,
        Dried,   
        Graded,
        Packed,
        For_Sale,
        with_distributor,
        with_retailer,
        with_consumer
    }

    struct Product{
        uint id;
        uint safranal_content;
        uint price;
        address payable farmer;
        address payable distributor;
        address payable retailer;
        address payable consumer;
        address payable Current_owner;
        State state;
        string grade;
    }

    mapping (uint => Product) public product_list;
    mapping (uint => bool) existing;


    modifier harvested(uint _id){
        require(product_list[_id].state == State.Harvested, "Saffron is not harvested");
        _;
    }
    
    modifier dried(uint _id){
        require(product_list[_id].state == State.Dried, "Saffron is not dried");
        _;
    }
    
    modifier graded(uint _id){
        require(product_list[_id].state == State.Graded, "Saffron is not graded");
        _;
    }

    modifier packed(uint _id){
        require(product_list[_id].state == State.Packed, "Saffron is not packed");
        _;
    }

    modifier exist(uint _id){
        require(existing[_id] == true, "Product doesn't exist");
        _;
    }

    modifier confirm_farmer(uint _id){
        require(product_list[_id].farmer == msg.sender, "Not authorized");
        _;
    }

    modifier only_distributor(address _add)
    {
        require(isDistributor(_add), "Not authorized");
        _;
    }

    modifier only_retailer(address _add)
    {
        require(isRetailer(_add), "Not authorized");
        _;
    }

    modifier forSale(uint _id){
        require(product_list[_id].state == State.For_Sale, "Not for sale");
        _;
    }
    
    modifier paid_enough(uint _price) {
        require(msg.value >= _price, "The amount is not sufficient to buy the product");
        _;
    }

    modifier withDistributor(uint _id)
    {
        require(product_list[_id].state == State.with_distributor, "Not authorized");
        _;
    }

    modifier only_consumer(address _add)
    {
        require(isConsumer(_add), "Not authorized");
        _;
    }

    modifier canBuy(uint _id)
    {
        require(can_buy(_id), "Item is not FOR SALE");
        _;
    }

    function can_buy(uint _id) internal view returns(bool)
    {
        if(product_list[_id].state == State.Packed || product_list[_id].state == State.with_distributor || product_list[_id].state == State.with_retailer)
        {
            return true;
        }

        return false; 
    }

    function add_product(uint _id, uint saf_content, string memory _grade,uint _price) public
    {
        harvest_product(_id, saf_content);
        dry_product(_id);
        grading(_id, _grade);
        packing(_id);
        for_sale(_id, _price);
    }

    function harvest_product(uint _id, uint saf_content) public  {
        require(isFarmer(msg.sender), "You are not authorized to perform this operation");
        Product memory product;
        product.id = _id;
        product.safranal_content = saf_content;
        product.farmer = payable(msg.sender);
        product.Current_owner = product.farmer;
        product.distributor = payable(address(0));
        product.retailer = product.distributor;
        product.consumer = product.distributor;
        product.state = State.Harvested;
        product_list[_id] = product;
        existing[_id] = true;
    }

    function dry_product(uint _id) exist(_id) harvested(_id) confirm_farmer(_id) public{
        product_list[_id].state = State.Dried;
    }

    function grading(uint _id, string memory _grade) exist(_id) dried(_id) confirm_farmer(_id) public{
        product_list[_id].grade = _grade;
        product_list[_id].state = State.Graded; 
    }
    
    function packing(uint _id) exist(_id) graded(_id) confirm_farmer(_id) public{
        product_list[_id].state = State.Packed;
    }
    
    function for_sale(uint _id, uint _price) exist(_id) packed(_id) confirm_farmer(_id) public{
        product_list[_id].state = State.For_Sale;
        product_list[_id].price = _price;
    }

    function get_response_from_verifiers (uint _id, uint safranal_content) public returns (bool)
    {
        bool confirmation = verify_auto(_id, safranal_content);
        if(confirmation == false)
        {
            rep_score[product_list[_id].Current_owner] --;
        }

        else
        {
            rep_score[product_list[_id].Current_owner] ++;
        }
        return confirmation;
    }

    function sell_to_distributor(uint _id, uint new_price) exist(_id) forSale(_id) only_distributor(msg.sender) paid_enough(product_list[_id].price) public payable{
        product_list[_id].Current_owner.transfer(product_list[_id].price);
        product_list[_id].Current_owner = payable(msg.sender);
        product_list[_id].distributor = payable(msg.sender);
        product_list[_id].state = State.with_distributor;
        product_list[_id].price = new_price; 
    }

    function sell_to_retailer(uint _id, uint new_price) exist(_id) paid_enough(product_list[_id].price) only_retailer(msg.sender) withDistributor(_id) public payable
    {
        product_list[_id].Current_owner.transfer(product_list[_id].price);
        product_list[_id].Current_owner = payable(msg.sender);
        product_list[_id].retailer = payable(msg.sender);
        product_list[_id].state = State.with_retailer;
        product_list[_id].price = new_price;
    }

    function sell_to_consumer(uint _id) exist(_id) paid_enough(product_list[_id].price)  only_consumer(msg.sender)  public payable
    {
        product_list[_id].Current_owner.transfer(msg.value);
        product_list[_id].Current_owner = payable(msg.sender);
        product_list[_id].consumer = payable(msg.sender);
        product_list[_id].state = State.with_consumer;
    }

    function compareStrings(string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}

    function verify_auto(uint _id, uint safranal_content) public returns(bool){
        reset();
        select_5_people();
        for(uint i = 0; i < selected_5_verifiers.length; i++)
        {
            uint random_number = generate_random(100, 1);
            if(random_number >= 20)
            {
                if(safranal_content >= 85 && compareStrings(product_list[_id].grade, 'A') == true)
                {
                    registered[selected_5_verifiers[i]].verdict = true;
                }

                else if(safranal_content >= 70 && compareStrings(product_list[_id].grade, 'B') == true)
                {
                    registered[selected_5_verifiers[i]].verdict = true;
                }

                else if(safranal_content >= 60 && compareStrings(product_list[_id].grade, 'C') == true)
                {
                    registered[selected_5_verifiers[i]].verdict = true;
                }

                else if(safranal_content >= 50 && compareStrings(product_list[_id].grade, 'D') == true)
                {
                    registered[selected_5_verifiers[i]].verdict = true;
                }

                else
                {
                    registered[selected_5_verifiers[i]].verdict = false;
                } 
            }

            else
            {
                if(safranal_content < 85 && compareStrings(product_list[_id].grade, 'A') == true)
                {
                    registered[selected_5_verifiers[i]].verdict = true;
                }

                else if(safranal_content < 70 && compareStrings(product_list[_id].grade, 'B') == true)
                {
                    registered[selected_5_verifiers[i]].verdict = true;
                }

                else if(safranal_content < 60 && compareStrings(product_list[_id].grade, 'C') == true)
                {
                    registered[selected_5_verifiers[i]].verdict = true;
                }

                else if(safranal_content < 50 && compareStrings(product_list[_id].grade, 'D') == true)
                {
                    registered[selected_5_verifiers[i]].verdict = true;
                }

                else
                {
                    registered[selected_5_verifiers[i]].verdict = false;
                } 
            }
        }
        return update_score();
    }

    function get_rep_score(address _add) public view returns (uint)
    {
        return rep_score[_add];
    }

    function decrement_rep_score(address _add) public
    {
        rep_score[_add] --;
    }

    function increment_rep_score(address _add) public
    {
        rep_score[_add] ++;
    }

}