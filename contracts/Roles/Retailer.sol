// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Roles.sol";

contract Retailer{
    using Roles for Roles.Record;

    Roles.Record private retailers;


    function addRetailer(address _add) public {
        Roles.add_member(retailers, _add);
    }

    function removeRetailer(address _add) public {
        Roles.remove_member(retailers, _add);
    }

    function isRetailer(address _add) public view returns(bool){
        return Roles.is_member(retailers, _add);
    }
}