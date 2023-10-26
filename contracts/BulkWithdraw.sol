// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BulkWithdraw is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private tokenId;

    mapping(uint16 => address) public tokens;

    struct InvoiceParams {
        address receiver;
        uint256 amount;
    }

    struct TokenInvoiceParams {
        uint16 token;
        address receiver;
        address sender;
        uint256 amount;
    }

    event TokenAdded(uint16 indexed id);

    constructor() {}

    function getTokenById(uint16 _id) public view returns (address) {
        require(_id != 0, "id should not be 0");
        return tokens[_id];
    }

    function getTokenByAddress(address _token) public view returns (uint16) {
        for (uint16 i; i < tokenId.current(); i++) {
            if (tokens[i] == _token) {
                return i;
            }
        }
        return 0;
    }

    function addToken(address token) public onlyOwner {
        tokenId.increment();
        uint16 currentId = uint16(tokenId.current());
        require(tokens[currentId] == address(0), "Token already set!");
        tokens[currentId] = token;
        emit TokenAdded(currentId);
    }

    function etherBulkTransferAmounts(
        InvoiceParams[] memory params
    ) public payable onlyOwner {
        uint256 totalAmount = 0;
        for (uint8 i; i < params.length; i++) {
            totalAmount += params[i].amount;
        }
        require(
            totalAmount <= address(this).balance,
            "There are not enough funds stored in the smart contract"
        );

        for (uint8 i; i < params.length; i++) {
            payable(params[i].receiver).transfer(params[i].amount);
        }
    }

    function erc20sMultiOriginBulkTransferAmounts(
        TokenInvoiceParams[] memory params
    ) public onlyOwner {
        for (uint16 i; i < params.length; i++) {
            IERC20 token = IERC20(tokens[params[i].token]);
            token.transferFrom(
                params[i].sender,
                params[i].receiver,
                params[i].amount
            );
        }
    }

    receive() external payable {}
}
