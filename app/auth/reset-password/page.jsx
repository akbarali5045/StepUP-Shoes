"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Logo from "@/public/assets/images/stepup.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import UpdatePassword from "@/components/Application/UpdatePassword";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { useState } from "react";

import OTPVerification from "@/components/Application/OTPVerification";
const ResetPassword = () => {
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [emailVerificationLoading, setemailVerificationLoading] =
    useState(false);
  const [otpEmail, setOtpEmail] = useState();
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const formSchema = zSchema.pick({
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleEmailVerification = async (values) => {
    try {
      setemailVerificationLoading(true);

      const { data: otpResponse } = await axios.post(
        "/api/auth/reset-password/send-otp",
        values,
      );

      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }
      setOtpEmail(values.email);

      showToast("success", otpResponse.message);
      setIsOtpVerified(true);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setemailVerificationLoading(false); // 👈 sirf yahi line change hui hai
    }
  };
  const handleOtpVerification = async (values) => {
    try {
      setOtpVerificationLoading(true);

      const { data: otpResponse } = await axios.post(
        "/api/auth/reset-password/verify-otp",
        values,
      );

      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }

      showToast("success", otpResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOtpVerificationLoading(false);
    }
  };
  return (
    <Card
      className="
    w-full
    max-w-[420px]
    rounded-3xl
    border
    border-white/40
    bg-white/95
    shadow-[0_25px_60px_rgba(0,0,0,0.25)]
    backdrop-blur-xl
  "
    >
      <CardContent>
        <div className="mb-4 flex justify-center">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="Step Up Logo"
            className="h-auto w-[180px] object-contain"
          />
        </div>

        {!otpEmail ? (
          <>
            {" "}
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Reset Password
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Enter your email for password reset.
              </p>
            </div>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEmailVerification)}>
                  <div className="mb-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-1.5 text-sm font-medium text-gray-800">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="example@gmail.com"
                              className="h-12 rounded-xl border-gray-200 bg-white px-4 shadow-sm transition-all focus:border-[#F04438] focus:ring-2 focus:ring-[#F04438]/20"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-3">
                    <ButtonLoading
                      loading={emailVerificationLoading}
                      type="submit"
                      text="Send OTP"
                      className="
  h-12
  w-full
  cursor-pointer
  rounded-xl
  bg-[#F04438]
  font-medium
  text-white
  shadow-sm
  transition-all
  duration-200
  hover:-translate-y-[1px]
  hover:bg-[#D9362B]
  hover:shadow-lg
  active:translate-y-0
"
                    />
                  </div>
                  <div className="mt-2 text-center text-sm">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        href={WEBSITE_LOGIN}
                        className="
        font-medium
        text-[#F04438]
        transition-colors
        hover:text-[#D9362B]
        hover:underline
      "
                      >
                        Back To Login
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <>
            {!isOtpVerified ? (
              <OTPVerification
                email={otpEmail}
                onSubmit={handleOtpVerification}
                loading={otpVerificationLoading}
              />
            ) : (
              <UpdatePassword email={otpEmail} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
