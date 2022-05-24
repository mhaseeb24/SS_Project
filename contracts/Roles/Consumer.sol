// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Roles.sol";

contract Consumer{
    using Roles for Roles.Record;

    Roles.Record private consumers;

    function addConsumer(address _add) public {
        Roles.add_member(consumers, _add);
    }

    function removeConsumer(address _add) public {
        Roles.remove_member(consumers, _add);
    }

    function isConsumer(address _add) public view returns(bool){
        return Roles.is_member(consumers, _add);
    }
}