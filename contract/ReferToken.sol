//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract mintToken is ERC20 {
    constructor() ERC20("REF3R", "REF3R") {}

    function mintTo(address _user) public {
        _mint(_user, 1000 );
    }
}