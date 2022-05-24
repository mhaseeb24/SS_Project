// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./Roles.sol";

contract Distributor{
    using Roles for Roles.Record;

    Roles.Record private distributors;


    function addDistributor(address _add) public {
        Roles.add_member(distributors, _add);
    }

    function removeDistributor(address _add) public {
        Roles.remove_member(distributors, _add);
    }

    function isDistributor(address _add) public view returns(bool){
        return Roles.is_member(distributors, _add);
    }
}