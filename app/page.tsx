"use client";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { useEffect, useMemo, useState } from "react";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);
  const [directionData, setDirectionData] = useState<any>([]);
  const [selectedCarAmount, setSelectedCarAmount] = useState<any>([]);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };
  // Wrap the context values in useMemo to prevent re-creation on every render
  const userLocationContextValue = useMemo(() => {
    return { userLocation, setUserLocation };
  }, [userLocation, setUserLocation]);

  const sourceCoordinatesContextValue = useMemo(() => {
    return { sourceCoordinates, setSourceCoordinates };
  }, [sourceCoordinates, setSourceCoordinates]);

  const destinationCoordinatesContextValue = useMemo(() => {
    return { destinationCoordinates, setDestinationCoordinates };
  }, [destinationCoordinates, setDestinationCoordinates]);

  const directionDataContextValue = useMemo(() => {
    return { directionData, setDirectionData };
  }, [directionData, setDirectionData]);

  const SelectedCarAmountContextValue = useMemo(() => {
    return { selectedCarAmount, setSelectedCarAmount };
  }, [selectedCarAmount, setSelectedCarAmount]);

  return (
    <main className="w-full max-h-screen">
      {/* with the help of context we can change the value of User location */}
      <UserLocationContext.Provider value={userLocationContextValue}>
        <SourceCordiContext.Provider value={sourceCoordinatesContextValue}>
          <DestinationCordContext.Provider
            value={destinationCoordinatesContextValue}
          >
            <DirectionDataContext.Provider value={directionDataContextValue}>
              <SelectedCarAmountContext.Provider
                value={SelectedCarAmountContextValue}
              >
                <main className="grid grid-col-1 md:grid-cols-3 w-full">
                  <div className="bg-yellow-900 w-full text-yellow-500">
                    <Booking />
                  </div>
                  <div className="col-span-2 bg-gray-100">
                    <MapBoxMap />
                  </div>
                </main>
              </SelectedCarAmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestinationCordContext.Provider>
        </SourceCordiContext.Provider>
      </UserLocationContext.Provider>
    </main>
  );
}
