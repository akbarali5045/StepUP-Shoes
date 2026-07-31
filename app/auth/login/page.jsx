"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Logo from "@/public/assets/images/stepup.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import Link from "next/link";
import { USER_DASHBOARD, WEBSITE_REGISTER, WEBSITE_RESETPASSWORD } from "@/routes/WebsiteRoute";
import axios from "axios";
import { showToast } from "@/lib/showToast";

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
import { z } from "zod";
import { useState } from "react";
import { login } from "@/store/reducer/authReducer";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import OTPVerification from "@/components/Application/OTPVerification";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from 'next/navigation'
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
const LoginPage = () => {
   const searchParams = useSearchParams()
    const router = useRouter()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState();
  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min(8, "Password must be at least 8 characters."),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);

      const { data: loginResponse } = await axios.post(
        "/api/auth/login",
        values,
      );

      if (!loginResponse.success) {
        throw new Error(loginResponse.message);
      }
      setOtpEmail(values.email);
      form.reset();
      showToast("success", loginResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (values) => {
    try {
      setOtpVerificationLoading(true);

      const { data: otpResponse } = await axios.post(
        "/api/auth/verify-otp",
        values,
      );

      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }
      setOtpEmail("");

      showToast("success", otpResponse.message);

      dispatch(login(otpResponse.data));

      if (searchParams.has('callback')) {
    router.push(searchParams.get('callback'))
} else {
    otpResponse.data.role === 'admin' ? router.push(ADMIN_DASHBOARD) : router.push(USER_DASHBOARD)
}
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
                Welcome Back
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Step into comfort and continue your shopping journey.
              </p>
            </div>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
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
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <div className="mb-1.5 flex items-center justify-between">
                            <FormLabel className="text-sm font-medium text-gray-800">
                              Password
                            </FormLabel>

                            <Link
                              href={WEBSITE_RESETPASSWORD}
                              className="text-sm text-[#F04438] transition-colors hover:text-[#D9362B] hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>

                          <FormControl>
                            <Input
                              type={isTypePassword ? "password" : "text"}
                              placeholder="**************"
                              className="
        h-12
        rounded-xl
        border-gray-200
        bg-white
        px-4
        pr-12
        shadow-sm
        transition-all
        focus:border-[#F04438]
        focus:ring-2
        focus:ring-[#F04438]/20
      "
                              {...field}
                            />
                          </FormControl>

                          <button
                            type="button"
                            aria-label={
                              isTypePassword ? "Show password" : "Hide password"
                            }
                            className="
      absolute
      right-3
      top-[35px]
      flex
      h-8
      w-8
      items-center
      justify-center
      rounded-md
      text-gray-500
      transition-colors
      hover:bg-gray-100
      hover:text-gray-800
      cursor-pointer
    "
                            onClick={() => setIsTypePassword(!isTypePassword)}
                          >
                            {isTypePassword ? (
                              <FaRegEyeSlash className="h-[17px] w-[17px]" />
                            ) : (
                              <FaRegEye className="h-[17px] w-[17px]" />
                            )}
                          </button>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-3">
                    <ButtonLoading
                      loading={loading}
                      type="submit"
                      text="Login"
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
                      <p className="text-gray-600">Don't have an account?</p>

                      <Link
                        href={WEBSITE_REGISTER}
                        className="
        font-medium
        text-[#F04438]
        transition-colors
        hover:text-[#D9362B]
        hover:underline
      "
                      >
                        Create account
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <OTPVerification
            email={otpEmail}
            loading={otpVerificationLoading}
            onSubmit={handleOtpVerification}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LoginPage;
