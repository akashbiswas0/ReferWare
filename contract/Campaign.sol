// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface Factory {
    function markAsJoinedCampaign(address _user, uint256 _campaignId) external;
}

contract Campaign is Ownable {
    Factory public factory;
    IERC20 public token;
    string public name;
    string public description;
    uint256 public escrowTerm;
    uint256 public escrowAmount;
    uint256 public claimRate;
    uint256 public campaignId;
    address[] public whitelisted;
    uint256 createdAt;
    uint256 claimedUpto;
    mapping(address => bool) public eligible;
    mapping(address => bool) public claimed;
    mapping(address => string) public influencerToReferCode;
    mapping(string => uint256) public codeToTimesClaimed;

    constructor(
        address _factory,
        address _token,
        string memory _name,
        string memory _description,
        uint256 _campaignId,
        uint256 _escrowTerm,
        uint256 _escrowAmount,
        uint256 _claimRate
    ) Ownable(tx.origin) {
        factory = Factory(_factory);
        campaignId = _campaignId;
        token = IERC20(_token);
        name = _name;
        description = _description;
        escrowTerm = _escrowTerm;
        escrowAmount = _escrowAmount;
        claimRate = _claimRate;
        createdAt = block.timestamp;
    }

    function whitelistUsers(address _user, uint256 _campaignId) external {
        whitelisted.push(_user);
        factory.markAsJoinedCampaign(_user, _campaignId);
    }

    function markAsEligibleToClaim(address _user) external {
        eligible[_user] = true;
    }

    function isWhitelisted(address _user) public view returns (bool) {
        for (uint256 i = 0; i < whitelisted.length; i++) {
            if (whitelisted[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function isEligibleToClaim(address _user) public view returns (bool) {
        return eligible[_user];
    }

    function returnGeneratedCode(address _user) public view returns (string memory) {
        return influencerToReferCode[_user];
    }

    function generateReferCode(address _user, string memory _code) public {
        influencerToReferCode[_user] = _code;
    }

    function returnCodeToTimesClaimed(string memory _code) public view returns (uint256) {
        return codeToTimesClaimed[_code];
    }

    function updateCodeToTimesClaimed(string memory _code, uint256 _value) public {
        codeToTimesClaimed[_code] = _value;
    }

    function releaseClaimedFundsToInfluencer(string memory _code, uint256 _timesCodeUsed) public {
        uint256 currentTimesCodeUsed = codeToTimesClaimed[_code];
        require(_timesCodeUsed > currentTimesCodeUsed, "Input value must be greater than the current times code used");

        uint256 timesToClaim = _timesCodeUsed - currentTimesCodeUsed;

        for (uint256 i = 0; i < timesToClaim; i++) {
            claim();
        }

        codeToTimesClaimed[_code] = _timesCodeUsed;
    }

    function getTotalEscrowAmount() public view returns (uint256) {
        return escrowAmount;
    }

    function getRemainingEscrowAmount() public view returns (uint256) {
        return getTotalEscrowAmount() - claimedUpto;
    }

    function claim() public {
        // require(createdAt + escrowTerm > block.timestamp);
        require(eligible[tx.origin] == true);
        require(claimed[tx.origin] == false);
        token.transfer(tx.origin, claimRate);
        claimed[tx.origin] = true;
        claimedUpto = claimedUpto + claimRate;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function getOwner() public view returns (address) {
        return owner(); // From the Ownable contract
    }
}