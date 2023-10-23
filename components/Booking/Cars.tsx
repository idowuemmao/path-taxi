// "use client";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import CarList from "@/data/CarList";
import Image from "next/image";
import React, { useContext, useState } from "react";

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { selectedCarAmount, setSelectedCarAmount } = useContext(
    SelectedCarAmountContext
  );

  const getCost = (charges: any) => {
    return Math.round(
      charges * directionData.routes[0].distance * 0.0006213709999975145
    );
  };

  return (
    <div className="mt-3 ">
      <h2 className="font-semibold text-lg">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center">
        {CarList.map((items: any, index: any) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCar(index);
              setSelectedCarAmount(getCost(items.charges));
            }}
            className={`border-2 p-2 rounded-lg hover:border-yellow-500 hover:scale-105 transition delay-150 ease-out cursor-pointer  ${
              index == selectedCar ? "border-yellow-500 border-4" : null
            }`}
          >
            <Image
              src={items.image}
              alt={items.name}
              width={150}
              height={200}
              className="w-auto h-auto"
            />
            <div className="grid gap-1 text-[0.6rem]">
              <h3 className="">{items.name}</h3>
              {directionData?.routes ? (
                <div className="grid">
                  <span className="text-white font-semibold">
                    ${getCost(items.charges)}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
