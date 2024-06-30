// @ts-nocheck
"use client";
import { FC, FormEventHandler, useState } from "react";
// 0x77929F1f2a404a6dEB38124E0E0c4d7F5500c595
import { ethers } from "ethers";
import {
  Account,
  Chain,
  Hex,
  Transport,
  WalletClient,
  PublicClient,
  parseEther,
} from "viem";

import {
  useDynamicContext,
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { contractAddress, contractAbi } from "@/ethers/contractConfig";

const SendTransactionSection: FC = () => {
  const { primaryWallet } = useDynamicContext();

  const [txnHash, setTxnHash] = useState("");
  console.log(primaryWallet);

  // if (!primaryWallet) return null;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const address = formData.get("address") as string;
    const amount = formData.get("amount") as string;
    const provider2 = await primaryWallet?.connector.getSigner<
      WalletClient<Transport, Chain, Account>
    >();
    const provider = await primaryWallet.connector.ethers?.getSigner();

    if (!provider) return;

    const functionName = "store";
    const functionArguments = [13];

    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );
    try {
      const tx = await contract[functionName](...functionArguments);
      await tx.wait();
      setTxnHash(tx.hash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }

    const client =
      await primaryWallet.connector.getPublicClient<PublicClient>();

    // const { transactionHash } = await client.getTransactionReceipt({
    //   txnHash,
    // });
    // setTxnHash(transactionHash);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>Send to ETH address</p>
        <input name="address" type="text" placeholder="Address" />
        <input name="amount" type="text" placeholder="0.05" />
        <button type="submit">Send</button>
        <span data-testid="transaction-section-result-hash">{txnHash}</span>
      </form>
      <button
        onClick={() => {
          console.log(primaryWallet);
        }}
      >
        check
      </button>{" "}
    </div>
  );
};
export default SendTransactionSection;
