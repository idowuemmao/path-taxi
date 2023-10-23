import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const MapBoxMap = () => {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCordiContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCordContext
  );
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  // used to fly the source marker location
  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  // used to fly the destination marker location
  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lng, destinationCoordinates.lat],
        duration: 2500,
      });
    }
    //run the getDirectionRoute if we have the destination and source coordinates
    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [destinationCoordinates]);

  //call the direction api where we get the list of coord
  const getDirectionRoute = async () => {
    if (sourceCoordinates && destinationCoordinates) {
      try {
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoordinates.lng}%2C${sourceCoordinates.lat}%3B${destinationCoordinates.lng}%2C${destinationCoordinates.lat}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
        );
        if (!res.ok) {
          throw new Error("Request failed with status " + res.status);
        }
        const result = await res.json();
        setDirectionData(result);
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    } else {
      console.log("The sourceCord and destCord is not defined");
    }
  };

  return (
    <div className="p-4 relative">
      <h2 className="text-xl font-semibold text-yellow-500 pb-2">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 550, borderRadius: 20 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className="hidden md:block absolute bottom-6 z-20 right-5">
        <DistanceTime />
      </div>
    </div>
  );
};

export default MapBoxMap;
