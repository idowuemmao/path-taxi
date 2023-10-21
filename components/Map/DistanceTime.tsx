import React, { useContext } from "react";
import { DirectionDataContext } from "@/context/DirectionDataContext";

const DistanceTime = () => {
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  return (
    <div>
      {directionData?.routes ? (
        <div className="bg-yellow-800 text-white p-2 rounded-xl text-sm opacity-80 flex gap-1 items-center">
          <h2 className="">
            Distance:{" "}
            {Math.floor(
              directionData.routes[0].distance * 0.0006213709999975145,
            )}{" "}
            Miles
          </h2>
          <hr className="rotate-90 w-4 border-2 border-white" />
          <h2>
            Duration: {Math.floor(directionData.routes[0].duration / 60)} Hours
          </h2>
        </div>
      ) : null}
    </div>
  );
};

export default DistanceTime;
