// "use client";
import { DestinationCordContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import React, { useContext, useEffect, useState } from "react";

const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";
const MAPBOX_RETRIEVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
// retrieve
const AutocompleteAddress = () => {
  //Stores the user's input for the source address
  const [source, setSource] = useState<any>("");
  //Indicates if there has been a change in the source input
  const [sourceChange, setSourceChange] = useState<any>(false);
  //Indicates if there has been a change in the destination input.
  const [destinationChange, setDestinationChange] = useState<any>(false);
  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCordiContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCordContext
  );

  //Stores the list of addresses retrieved from an API call.
  const [addressList, setAddressList] = useState<any>([]);

  //Stores the user's input for the destination address.
  const [destination, setDestination] = useState<string>("");

  //used to trigger an API call whenever the `source` or `destination` inputs change
  useEffect(() => {
    //sets a timeout of 1second before calling the `getAddress` function
    //debounce mechanism ensures that the API call is made after a brief delay once the user stops typing.
    const delayDebounceFn = setTimeout(() => {
      getAddress();
    }, 1000);
    //cleans up the timeout when the `source` or `destination` inputs change again to avoid unnecessary API calls.
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]); ///As the source and destination is changing this function will get called

  //to fetch address suggestions based on the user's input (either `source` or `destination`)
  const getAddress = async () => {
    //clears the `addressList` state to empty the previous suggestions
    setAddressList([]);
    //Constructs the API query based on whether `sourceChange` is `true` (for source input) or `destination` (for destination input).
    const query = sourceChange ? source : destination;

    try {
      //Performs a `fetch` request to the API endpoint with the constructed query
      const res = await fetch(`/api/search-address?q=${query}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok!");
      }
      //Converts the API response into JSON format
      const result = await res.json();
      //Sets the retrieved suggestions into the `addressList` state
      setAddressList(result);
    } catch (error) {
      console.log("Error Fetching addresses: ", error);
    }
  };

  const onSourceAddressClick = async (items: any) => {
    setSource(items.full_address);
    setAddressList([]);
    setSourceChange(false);
    const res = await fetch(
      MAPBOX_RETRIEVE_URL +
        items.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    setSourceCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };
  const onDestinationAddressClick = async (item: any) => {
    setDestination(item.full_address);
    setAddressList([]);
    setDestinationChange(false);
    const res = await fetch(
      MAPBOX_RETRIEVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );
    const result = await res.json();
    setDestinationCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };
  return (
    <main className="w-full ">
      <div className="mt-4 relative">
        <label className="text-yellow-500">Enter Location</label>
        {/* Once you put something in the input it'll set the source value */}
        <input
          type="text"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
          className="bg-white p-1 border-[1px] border-yellow-400  w-full rounded-md outline-none text-black"
        />
        {addressList?.suggestions && sourceChange ? (
          <div className="shadow-lg p-2 rounded-lg absolute w-full bg-white z-50">
            {addressList.suggestions.map((items: any, index: number) => (
              <h2
                key={index}
                className="cursor-pointer z-50 text-black hover:bg-gray-100 p-3 rounded-lg"
                onClick={() => {
                  onSourceAddressClick(items);
                }}
              >
                {items.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-4 relative ">
        <label className="text-yellow-500">Enter Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true);
          }}
          className="bg-white p-1 border-[1px] border-yellow-400 w-full rounded-md outline-none text-black"
        />

        {addressList?.suggestions && destinationChange ? (
          <div className="shadow-lg p-2 rounded-lg absolute w-full bg-white">
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                className="cursor-pointer z-10 text-black"
                onClick={() => {
                  onDestinationAddressClick(item);
                }}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default AutocompleteAddress;
