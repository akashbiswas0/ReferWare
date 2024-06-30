import React from "react";
import Image from "next/image";

const CardsInfluencersForInfluencers = ({
  image,
  name,
  description,
  followers,
}: {
  image: any;
  name: string;
  description: string;
  followers: any;
}) => {
  return (
    <div className="text-white w-[23%] p-3 rounded-lg bg-[#111111] flex flex-col gap-3">
      <div className="rounded-full">
        <Image
          src={image}
          width="65"
          height="65"
          alt="home fill"
          className="rounded-full"
        />
      </div>
      <p className="text-xl font-semibold">{name}</p>
      <p>{description}</p>
      <div className="bg-white h-[1px] rounded-full"></div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Image
            src="/icons/FollowersCount.svg"
            width="15"
            height="100"
            alt="home fill"
          />
          <p className="text-[0.7rem]">Main Account Follower Count:</p>
        </div>
        <p className="text-[0.7rem]">{followers}</p>
      </div>
      <div className="flex justify-between">
        <button className="text-white text-sm bg-[#3572EF] py-1 rounded-lg w-[40%]">
          View
        </button>
        <button className="text-white text-sm bg-[#3572EF] py-1 rounded-lg w-[40%]">
          Connect
        </button>
      </div>
    </div>
  );
};

export default CardsInfluencersForInfluencers;
