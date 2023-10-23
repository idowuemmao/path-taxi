// "use client";
import CardsList from "@/data/CardsList";
import Image from "next/image";
import React, { useState } from "react";

const Cards = () => {
  const [selectedCard, setSelectedCard] = useState<any>();
  return (
    <div>
      <h2 className="font-semibold text-lg">Payment Method</h2>
      <div className="grid grid-cols-5 gap-2">
        {CardsList.map((items: any, index: any) => (
          <div
            key={index}
            onClick={() => setSelectedCard(index)}
            className={`border-2 w-fit flex items-center justify-center rounded-lg cursor-pointer mt-2 hover:scale-105 transition-all p-1 hover:border-yellow-500 ${
              selectedCard == index ? "border-4 border-yellow-500 " : null
            }`}
          >
            <Image
              src={items.image}
              alt={items.name}
              width={30}
              height={50}
              className="w-auto h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
