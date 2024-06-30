// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import ViewCampaign from "../dashboard/ViewCampaign";
import WhitelistInfluencer from "../dashboard/WhitelistInfluencer";
import { ethers } from "ethers";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useIsInfluencer } from "@/store";
import ReferalCode from "@/components/dashboard/ReferalCode";
import GenCode from "../dashboard/GenCode";
import GetCode from "../dashboard/GetCode";
import ClaimTokens from "@/components/dashboard/ClaimTokens";
import appwriteService from "@/appwrite/config";

import {
  counterContractAbi,
  counterContractAddress,
  tokenContractAbi,
  tokenContractAddress,
  referFactoryContractAddress,
  referFactoryContractAbi,
  campaignContractAbi,
} from "@/ethers/contractConfig";

const CardsActiveCampaigns = ({
  address,
  contractAddress,
  campaign,
  campaigndesc,
  // number,
  balance,
  total,
  referTokenBalance,
}: {
  address: string;
  contractAddress: string;
  campaign: string;
  campaigndesc: string;
  // number: any;
  balance: any;
  total: any;
}) => {
  const [view, setView] = useState(true);
  const [whitelist, setWhitelist] = useState(true);
  const [totalBalance, setTotalBalence] = useState();
  const [remainingBalance, setRemainingBalance] = useState();
  const [allBrands, setAllBrands] = useState();
  const [allInfluencers, setAllInfluencers] = useState();
  const [alreadyGeneratedCode, setAlreadyGeneratedCode] = useState();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isInfluencerEligibleToClaim, setIsInfluencerEligibleToClaim] =
    useState(false);

  const { primaryWallet } = useDynamicContext();
  const { user } = useDynamicContext();
  const walletAddress = user?.verifiedCredentials[0].address;
  const isInfluencer = useIsInfluencer.getState().isInfluencer;
  //console.log("wallet ", walletAddress);
  const getSigner = async () => {
    return await primaryWallet.connector.getSigner<
      WalletClient<Transport, Chain, Account>
    >();
  };
  const getProvider = async () => {
    return await primaryWallet.connector.getPublicClient<PublicClient>();
  };
  const isEligibleToClaim = async () => {
    if (!primaryWallet) {
      console.log("primary wallet error");
    } else {
      console.log(primaryWallet);
    }

    const provider = await getProvider();
    console.log(provider);

    try {
      const data = await provider.readContract({
        address: contractAddress,
        abi: campaignContractAbi,
        functionName: "isEligibleToClaim",
        args: [walletAddress],
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log("error getting if eligible to claim ", error);
    }
  };
  const checkAlreadyGeneratedCode = async () => {
    if (!primaryWallet) {
      console.log("primary wallet error");
    } else {
      console.log(primaryWallet);
    }

    const provider = await getProvider();
    console.log(provider);

    try {
      const data = await provider.readContract({
        address: contractAddress,
        abi: campaignContractAbi,
        functionName: "returnGeneratedCode",
        args: [walletAddress],
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(
        "error getting if influencer has already generated code ",
        error
      );
    }
  };

  const getAmountData = async () => {
    console.log("test log");
    console.log("campaign data 1", contractAddress);
    if (!primaryWallet) {
      console.log("primary wallet error");
    } else {
      // console.log(primaryWallet);
    }

    const provider = await getProvider();
    console.log(provider);

    try {
      const data = await provider.readContract({
        address: contractAddress,
        abi: campaignContractAbi,
        functionName: "getTotalEscrowAmount",
      });
      console.log(data);
      setTotalBalence(Number(String(data)));
      // return data;
    } catch (error) {
      console.log("error getting if eligible to claim ", error);
    }
    try {
      const data = await provider.readContract({
        address: contractAddress,
        abi: campaignContractAbi,
        functionName: "getRemainingEscrowAmount",
      });
      console.log(data);
      setRemainingBalance(Number(String(data)));
      // return data;
    } catch (error) {
      console.log("error getting if eligible to claim ", error);
    }
  };
  async function updateAllUsersData() {
    const allBrands = await appwriteService.getAllBrands();
    setAllBrands(allBrands);
    console.log(allBrands);
    const allInfluencers = await appwriteService.getAllInfluencers();
    setAllInfluencers(allInfluencers);
    console.log(allInfluencers?.documents);
  }
  const websiteUrlFromPublicKey = async () => {
    const res = await appwriteService.getBrandWebStoreKey(address);

    //console.log(res);
    //console.log(res.documents[0].website);
    const data = res.documents[0].website;

    console.log("web store data test", data);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAmountData();
      const isEligible = await isEligibleToClaim();
      const hasAlreadyGeneratedCode = await checkAlreadyGeneratedCode();
      console.log(isEligible);
      setIsInfluencerEligibleToClaim(isEligible);
      console.log(data);
      updateAllUsersData();
      console.log(
        "has influencer already generated code ?",
        hasAlreadyGeneratedCode
      );
      setAlreadyGeneratedCode(hasAlreadyGeneratedCode);
      const websiteUrl = await websiteUrlFromPublicKey();
      setWebsiteUrl(websiteUrl);
    };

    fetchData();
  }, [referTokenBalance]);
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-2 p-4 text-white bg-[#3572EF] rounded-t-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{campaign}</h2>
          <div className="">
            <div className="py-1 text-white flex justify-center items-center w-[60%] gap-1 rounded-full">
              <div className="rounded-full border border-white p-[8px] bg-[#0015ff]"></div>
              <p>Live</p>
            </div>
          </div>
        </div>

        <div className="w-[85%]">
          <p className="text-sm">{campaigndesc}</p>

          <p className="text-sm">
            Brand Store :{" "}
            <a
              href={`https:\\${websiteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {websiteUrl}
            </a>
          </p>
        </div>

        {/* <div>
          <p className="text-sm">{number} influencers</p>
        </div> */}
      </div>

      <div className="flex items-center justify-between px-8 text-sm w-full py-3 text-white bg-black rounded-b-xl">
        <div className="flex gap-2 justify-center items-center">
          <div className="rounded-full border border-white p-[10px] bg-[#2765e0]"></div>
          <div>
            <p className="text-[#777777]">BALANCE</p>
            <p>
              ${remainingBalance} of ${totalBalance} remaining
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {!isInfluencer ? (
            <></>
          ) : alreadyGeneratedCode ? (
            <ClaimTokens
              address={address}
              codee={alreadyGeneratedCode}
              campaignAddress={contractAddress}
              referTokenBalance={referTokenBalance}
            ></ClaimTokens>
          ) : (
            <></>
          )}
          {isInfluencer ? (
            !alreadyGeneratedCode ? (
              <GenCode address={address} contractAddress={contractAddress} />
            ) : (
              <GetCode address={address} contractAddress={contractAddress} />
            )
          ) : (
            <button
              className={`text-[#276ee0]`}
              onClick={() => {
                setWhitelist(false);
              }}
            >
              Whitelist Influencer
            </button>
          )}

          {view ? "" : <ClaimTokens></ClaimTokens>}
          {whitelist ? (
            ""
          ) : (
            <WhitelistInfluencer
              allInfluencers={allInfluencers}
              camapignAddresses={contractAddress}
              remainingBalance={remainingBalance}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsActiveCampaigns;
