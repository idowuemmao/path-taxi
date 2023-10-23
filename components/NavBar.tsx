import Image from "next/image";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b-[1px] shadow-xl bg-black">
      <nav className="grid items-center flex-col w-fit cursor-pointer">
        <Image
          src="/path-taxi.png"
          alt="logo"
          width={80}
          height={60}
          className="w-auto"
          priority={true}
        />
        <h1 className="font-black text-sm text-center text-yellow-400">
          PATH TAXI
        </h1>
      </nav>
      <ul className="hidden md:flex gap-10 text-white">
        <li className="hover:bg-yellow-400 hover:text-black p-2 rounded-lg cursor-pointer text-yellow-400">
          Home
        </li>
        <li className="hover:bg-yellow-400 hover:text-black p-2 rounded-lg cursor-pointer text-yellow-400">
          History
        </li>
        <li className="hover:bg-yellow-400 hover:text-black p-2 rounded-lg cursor-pointer text-yellow-400">
          Help
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
