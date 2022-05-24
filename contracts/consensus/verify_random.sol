// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.6.0;

contract verify_random
{
    uint random_temp = 0;
    uint public random_num;
    struct person{
        uint id;
        uint rep_score;
        bool verdict;
    }

    person [] private v_members;
    uint [] pred_arr;
    uint [] selected_5_verifiers;
    mapping(uint => bool) Hsh;
    uint global_id = 0;

    mapping (address => bool) private verifiers;
    mapping (uint => person) private registered;
    mapping (address => person) private add_to_person;

    function verify_auto() public returns(bool){
        reset();
        select_5_people();
        for(uint i = 0; i < selected_5_verifiers.length; i++)
        {
            uint random_number = generate_random(100, 1);
            if(random_number >= 30)
            {
                registered[selected_5_verifiers[i]].verdict = true; 
            }

            else
            {
                registered[selected_5_verifiers[i]].verdict = false; 
            }
        }
        return update_score();
    }

    function verify() internal returns(bool){
        reset();
        select_5_people();
        // send notification to 5 verifiers and update the verdict of the particular person.
        return update_score();
    }

    function reset() public
    {
        for(uint i=0;i<v_members.length;i++)
        {
            Hsh[v_members[i].id] = true; 
        }
        uint len = pred_arr.length;
        while(len != 0)
        {
            pred_arr.pop();
            len--;
        }
        len = selected_5_verifiers.length;
        while(len != 0)
        {
            selected_5_verifiers.pop();
            len--;
        }
    }

    function ver_register() public 
    {
        require(verifiers[msg.sender] == false);
        verifiers[msg.sender] = true;
        person memory p;
        p.id = global_id ++;
        p.rep_score = 1;
        registered[p.id] = p;
        Hsh[p.id] = true;
        v_members.push(p);
        add_to_person[msg.sender] = p;
    }

    function generate_random(uint num_max, uint num_min) public returns (uint)
    {
        random_temp++;
        random_num =  uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,random_temp))) % 100;
        uint old_range = 100;  
        uint new_range = num_max - num_min;
        return (((random_num - 0) * new_range) / old_range) + num_min;
    }
    function clear_pred_arr() internal 
    {
        uint len = pred_arr.length;
        while(len != 0)
        {
            pred_arr.pop();
            len--;
        }
    }
    function fill_pred_arr () internal returns(uint)
    {
        uint track;
        for(uint i = 0; i < v_members.length; i++)
        {
            if(Hsh[v_members[i].id] == true)
            {
                track = v_members[i].rep_score;
                for(uint j = 0; j < track ; j++)
                {
                    pred_arr.push(v_members[i].id);
                }
            }
            else
            {
                continue;
            }
        }
        uint ran = generate_random(pred_arr.length-1, 0);
        Hsh[pred_arr[ran]] = false;
        return pred_arr[ran];
    }
    
    function select_5_people() internal
    {
        require(v_members.length >= 5);
        uint T = 5;
        while(T != 0)
        {
            selected_5_verifiers.push(fill_pred_arr());
            T--;
            clear_pred_arr();
        }
    }

    function choose_final_verdict() internal view returns(bool)
    {
        require(selected_5_verifiers.length >= 5);
        uint yes;
        uint no;

        for(uint i = 0; i < selected_5_verifiers.length; i++)
        {
            if(registered[selected_5_verifiers[i]].verdict == true)
            {
                yes ++;
            }

            else
            {
                no ++;
            }
        }

        return yes >= no;
    }

    function approve() internal
    {
        add_to_person[msg.sender].verdict = true;
    }

    function reject() internal
    {
        add_to_person[msg.sender].verdict = false;
    } 

    function update_score() internal returns(bool)
    {
        bool review = choose_final_verdict();
        for(uint i = 0; i < selected_5_verifiers.length; i ++)
        {
            if(review == registered[selected_5_verifiers[i]].verdict)
            {
                registered[selected_5_verifiers[i]].rep_score ++;
            }

            else
            {
                registered[selected_5_verifiers[i]].rep_score --;
            }
        }
        return review;
    }  
}