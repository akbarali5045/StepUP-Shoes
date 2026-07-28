"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import verifiedImg from "@/public/assets/images/verified.gif";
import verificationFailedImg from "@/public/assets/images/verification-failed.gif";

import { WEBSITE_HOME } from "@/routes/WebsiteRoute";

const EmailVerification = ({ params }) => {
  const { token } = use(params);

  // loading | success | failed
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.post("/api/auth/email-verify", {
          token,
        });

        if (data.success) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    };

    verify();
  }, [token]);

  // Loading Screen
  if (status === "loading") {
    return (
      <Card className="w-[400px]">
        <CardContent className="py-10 text-center">
          <h2 className="text-xl font-semibold">
            Verifying your email...
          </h2>

          <p className="mt-3 text-gray-500">
            Please wait a moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Success Screen
  if (status === "success") {
    return (
      <Card className="w-[400px]">
        <CardContent className="py-8">
          <div className="flex justify-center">
            <Image
              src={verifiedImg}
              width={120}
              height={120}
              alt="Email Verified"
              priority
            />
          </div>

          <div className="text-center mt-6">
            <h1 className="text-2xl font-bold text-green-600">
              Email Verified Successfully!
            </h1>

            <p className="mt-2 text-gray-600">
              Your Step Up account has been verified successfully.
            </p>

            <Button asChild className="mt-6">
              <Link href={WEBSITE_HOME}>
                Start Shopping
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Failed Screen
  return (
    <Card className="w-[400px]">
      <CardContent className="py-8">
        <div className="flex justify-center">
          <Image
            src={verificationFailedImg}
            width={120}
            height={120}
            alt="Verification Failed"
            priority
          />
        </div>

        <div className="text-center mt-6">
          <h1 className="text-2xl font-bold text-red-600">
            Verification Failed
          </h1>

          <p className="mt-2 text-gray-600">
            This verification link is invalid or has expired.
          </p>

          <Button asChild className="mt-6">
            <Link href="/auth/register">
              Create Account Again
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerification;