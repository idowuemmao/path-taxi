// 'use client'
import React, { useContext, useState } from "react";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

const Booking = () => {
  const { selectedCarAmount, setSelectedCarAmount } = useContext(
    SelectedCarAmountContext,
  );
  const router: any = useRouter();

  return (
    <main className="p-5 w-full ">
      <h2 className="text-2xl font-bold">Booking</h2>
      <div className="border-[1px] border-yellow-400 p-5 rounded-lg grid gap-2">
        <AutocompleteAddress />
        <Cars />
        <Cards />
        <button
          onClick={() => router.push("/payment")}
          // disabled={!selectedCarAmount}
          className={`bg-yellow-500 p-2 text-center mt-4 text-black rounded-lg cursor-pointer hover:scale-95 transition-all font-semibold ${
            !selectedCarAmount ? "bg-yellow-200" : null
          }`}
        >
          Book
        </button>
      </div>
    </main>
  );
};

export default Booking;
