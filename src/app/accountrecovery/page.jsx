import Image from "next/image";
import React from "react";

function page() {
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
          <div className="flex flex-col gap-2 ">
            <p className="text-4xl text-center font-bold">27</p>
            <p className="font-semibold">Open the Gmail app on Phone</p>
            <p className="font-medium">Google sent a notification to your Phone. Open the Gmail app, tap <span className="font-bold">Yes</span> on the prompt, then tap <span className="font-bold">27</span> on your phone to verify it's you.</p>
          </div>
          <div className="text-blue-500 font-semibold">
            Resend it
          </div>
        </div>
        <div className="flex justify-start text-sm font-bold text-blue-500">
          I don't have my phone
        </div>
      </div>
    </div>
  );
}

export default page;
