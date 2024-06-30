import React from "react";
import Image from "next/image";

function InfPaymentSettings() {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-[70%] flex flex-col gap-4">
        <div className="p-6 rounded-lg bg-[#2D2D2D] flex justify-between items-center">
          <div>
            <p className="text-white text-xl font-semibold">Wallet</p>
            <p className="text-[#9CB3C9] text-lg">Connect Your Wallet</p>
          </div>
          <button className="text-[#3572EF] font-medium px-2 py-1 border-2 border-[#3572EF] rounded-lg w-[14%]">
            Connect
          </button>
        </div>

        <div className="p-6 rounded-lg bg-[#2D2D2D] flex justify-between items-center">
          <div>
            <p className="text-white text-xl font-semibold">Paypal</p>
            <p className="text-[#9CB3C9] text-lg">
              Connect your Paypal Account
            </p>
          </div>
          <button className="text-[#3572EF] font-medium px-2 py-1 border-2 border-[#3572EF] rounded-lg w-[14%]">
            Connect
          </button>
        </div>

        <div className="p-6 rounded-lg bg-[#2D2D2D] flex justify-between items-center">
          <div>
            <p className="text-white text-xl font-semibold">Stripe</p>
            <p className="text-[#9CB3C9] text-lg">
              Connect Your Stripe Account
            </p>
          </div>
          <button className="text-[#3572EF] font-medium px-2 py-1 border-2 border-[#3572EF] rounded-lg w-[14%]">
            Connect
          </button>
        </div>

        <div className="p-6 rounded-lg bg-[#2D2D2D] flex justify-between items-center">
          <div>
            <p className="text-white text-xl font-semibold">Plans</p>
            <p className="text-[#9CB3C9] text-lg">
              Manage your plans and their details
            </p>
          </div>
          <button className="bg-[#3572EF] px-2 py-1 border-2 border-transparent text-white rounded-lg w-[14%]">
            Manage
          </button>
        </div>

        <div className="p-6 rounded-lg bg-[#2D2D2D] flex justify-between items-center">
          <div>
            <p className="text-white text-xl font-semibold">Earnings</p>
            <p className="text-[#9CB3C9] text-lg">
              Earning Available to collect
            </p>
          </div>
          <button className="bg-[#3572EF] px-2 py-1 border-2 border-transparent text-white rounded-lg w-[14%]">
            Collect
          </button>
        </div>
      </div>

      <button className="flex items-center gap-2">
        <Image
          src="/icons/download-Filled.svg"
          width="100"
          height="100"
          className="w-[3%]"
          alt="Ref3r logo"
        />
        <p className="text-[#AFAFAF] font-medium">EXPORT MY DATA</p>
      </button>
    </div>
  );
}

export default InfPaymentSettings;
