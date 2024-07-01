// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Campaign.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract ReferFactory {

    IERC20 public token;
    address public tokenAddress;
    Campaign campaign;

    constructor() {
        tokenAddress = 0x418BFe0F8D7D919DC2191CE12C06Dcbac7478478;
    }

    event campaignCreated(uint campaignId, address _host);
    event influencerJoined(uint _campaignId, address _influencer);

    struct CampaignStr {
        address _contract;
        address _host;
        uint createAt;
        uint term;
        string name;
        string description;
        uint256 escrowAmount;
    }

    mapping (uint => CampaignStr) public idToCampaign;
    mapping (address => uint) public campaignToId; // New mapping
    uint public campaignId;
    mapping (address => uint[]) public joinedCampaigns;

    // _escrowTerm needs to be in terms of seconds
    // _escrowAmount needs to be in terms of wei
    // _claimRate needs to be in terms of wei
    function createCampaign(string memory _name , string memory _description, uint256 _escrowTerm, uint _escrowAmount, uint _claimRate) public {
        Campaign t = new Campaign(address(this), tokenAddress,_name,_description, campaignId, _escrowTerm, _escrowAmount, _claimRate);
        token = IERC20(tokenAddress);
        token.transferFrom(tx.origin, address(t), _escrowAmount);
        ++campaignId;
        idToCampaign[campaignId] = CampaignStr(address(t), msg.sender, block.timestamp, _escrowTerm,_name,_description,_escrowAmount);
        campaignToId[address(t)] = campaignId; // Add this line to map the campaign address to its ID
        emit campaignCreated(campaignId, msg.sender);
    }

    function claim(uint _campaignId) public {
        campaign = Campaign(idToCampaign[_campaignId]._contract);
        campaign.claim();
    }

    function whitelistUsers(uint _campaignId, address _user) public  {
        campaign = Campaign(idToCampaign[_campaignId]._contract);
        
        campaign.whitelistUsers(_user,_campaignId);
    }

    function markAsEligibleToClaim(uint _campaignId, address _user) public {
        campaign = Campaign(idToCampaign[_campaignId]._contract);
        campaign.markAsEligibleToClaim(_user);
    }

    function markAsJoinedCampaign(address _user,uint _campaignId) public  {
        joinedCampaigns[_user].push(_campaignId);
        emit influencerJoined(_campaignId, tx.origin);
    }

    function fetchAllCmapaign() public view returns (CampaignStr[] memory) {
        uint counter = 0;
        CampaignStr[] memory campaigns = new CampaignStr[](campaignId);

        for (uint i = 0; i < campaignId; i++) {
            uint currentId = i + 1;
            CampaignStr storage currentItem = idToCampaign[currentId];
            campaigns[counter] = currentItem;
            counter++;
        }

        return campaigns;
    }

    function fetchBrandCampaign(address _user) public view returns (CampaignStr[] memory) {
        uint counter = 0;
        uint length = 0;

        // Count the number of campaigns created by the brand
        for (uint i = 1; i <= campaignId; i++) {
            if (idToCampaign[i]._host == _user) {
                length++;
            }
        }

        CampaignStr[] memory campaigns = new CampaignStr[](length);

        // Populate the campaigns array with the brand's campaigns
        for (uint i = 1; i <= campaignId; i++) {
            if (idToCampaign[i]._host == _user) {
                CampaignStr storage currentItem = idToCampaign[i];
                campaigns[counter] = currentItem;
                counter++;
            }
        }

        return campaigns;
    }

    function fetchJoinedCampaign(address _user) public view returns (CampaignStr[] memory) {
        uint counter = 0;
        uint length = joinedCampaigns[_user].length;
        CampaignStr[] memory campaigns = new CampaignStr[](length);

        for (uint i = 0; i < length; i++) {
            uint currentId = joinedCampaigns[_user][i];
            CampaignStr storage currentItem = idToCampaign[currentId];
            campaigns[counter] = currentItem;
            counter++;
        }

        return campaigns;
    }

    // New function to get campaign ID from campaign address
    function getCampaignId(address _campaignAddress) public view returns (uint) {
        return campaignToId[_campaignAddress];
    }
}