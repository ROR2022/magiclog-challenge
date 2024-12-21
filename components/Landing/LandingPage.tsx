"use client";
import { useRouter } from "next/navigation";
import { useMediaQuery, useLocalStorage } from "usehooks-ts";
import React, { useEffect } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

import { title } from "../primitives";

import { LOCALSTORAGE_KEY } from "@/dataEnv/dataEnv";
import { DataUser, initialState } from "@/redux/userSlice";

const LandingPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [storedDataUser] = useLocalStorage<DataUser>(
    LOCALSTORAGE_KEY,
    initialState,
  );

  useEffect(() => {
    if (storedDataUser.email) {
      router.push("/dashboard");
    }
  }, [storedDataUser]);

  return (
    <>
      <div className="flex items-center justify-center">
        <h2 className={title()}>Marketplace</h2>
      </div>
      <div
        className={
          isMobile
            ? "flex flex-col items-center justify-center gap-4 py-8 md:py-10"
            : "flex flex-row items-center justify-center gap-4 py-8 md:py-10"
        }
      >
        <Card isFooterBlurred className="border-none" radius="lg">
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={isMobile ? 200 : 350}
            src="/logoLogin.png"
            width={isMobile ? 200 : 350}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <Button
              className="text-tiny text-white bg-black/20"
              color="default"
              radius="lg"
              size="sm"
              variant="flat"
              onPress={() => router.push("/login")}
            >
              Login Here
            </Button>
          </CardFooter>
        </Card>

        <Card isFooterBlurred className="border-none" radius="lg">
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={isMobile ? 200 : 350}
            src="/logoRegister.jpg"
            width={isMobile ? 200 : 350}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <Button
              className="text-tiny text-white bg-black/20"
              color="default"
              radius="lg"
              size="sm"
              variant="flat"
              onPress={() => router.push("/register")}
            >
              Register Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LandingPage;
