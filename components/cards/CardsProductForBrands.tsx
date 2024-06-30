import React from "react";
import Image from "next/image";

const CardsProductForBrands = ({
  image,
  name,
  link,
}: {
  image: any;
  name: string;
  link: string;
}) => {
  return (
    <div className="w-[18%] bg-[#27292DCC] p-2 rounded-xl flex flex-col justify-center text-center items-center gap-4 min-h-[250px]">
      <Image
        // src={`/${image}.svg`}
        src={image}
        width="120"
        height="100"
        alt="fetch error"
        className="rounded-t-lg w-full"
      />
      <p className="text-white font-medium">{name}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="rounded-lg bg-[#3572EF] text-white px-4 py-1 text-sm">
          {" "}
          View
        </button>
      </a>
    </div>
  );
};

export default CardsProductForBrands;
