import Image from "next/image";
import React from "react";
import { MoveLeft } from "lucide-react";
import { ChevronDown } from 'lucide-react';

function AccountVerify() {
  return (
    <div className=" w-full min-h-screen flex flex-col justify-center items-center relative">
      <div className="flex flex-col w-full max-w-md p-10 h-screen  justify-between ">
        <div className="flex flex-col gap-10 ">
          <div className="flex gap-4 items-center">
            <MoveLeft />
            <p className="font-bold text-2xl">
              Google <span className="font-normal text-zinc-400">Account</span>{" "}
            </p>
          </div>
          <div className="flex flex-col  gap-3">
            <div className="">
              <Image
                src={"/logo2.png"}
                alt="logo"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-medium mb-1 ">Welcome</h1>
          </div>
          <div className="space-y-2">
            <p className="text-xl">Verifying it's you..</p>
            <p>Complete sign-in using your passkey</p>
          </div>
          <div>
            <p className="text-blue-500 font-semibold">Try another way</p>
          </div>
        </div>
        
          <div className="flex flex-col md:flex-row gap-5 justify-between items-start md:items-center text-sm font-semibold text-gray-600">
            <span className="flex items-center gap-2">English (United States)
            <ChevronDown size={20}/>


            </span>
            <div className="space-x-4">
              <button>Help</button>
              <button>Privacy</button>
              <button>Terms</button>
            </div>
          </div>
        
      </div>
      <div className="absolute bg-black/30 z-10 w-full h-full"/>
    </div>
  );
}

export default AccountVerify;
