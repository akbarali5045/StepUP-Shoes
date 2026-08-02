"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Logo from "@/public/assets/images/stepup.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import Link from "next/link";
import axios from "axios";
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

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { showToast } from "@/lib/showToast";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);
  const formSchema = zSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and confirm password must be same.",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
 const handleRegisterSubmit = async (values) => {
    try {
        setLoading(true)
        const { data: registerResponse } = await axios.post('/api/auth/register', values)
        if (!registerResponse.success) {
            throw new Error(registerResponse.message)
        }

        form.reset()
        showToast('success', registerResponse.message)   // ✅ success case

    } catch (error) {
         showToast('error', error.message)   // ✅ error/catch case
    } finally {
        setLoading(false)
    }
}
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
        <div className="mb-5 flex justify-center">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="Step Up Logo"
            className="h-auto w-[180px] object-contain"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Create your account to start your shopping journey.
          </p>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1.5 text-sm font-medium text-gray-800">
                        Full Name
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Akbar Ali"
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
                      <FormLabel className="mb-1.5 text-sm font-medium text-gray-800">
                        Password
                      </FormLabel>

                      <FormControl>
                        <Input
                          type={isPasswordVisible ? "password" : "text"}
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
                          isPasswordVisible ? "Show password" : "Hide password"
                        }
               className=" absolute right-3 top-[35px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 "
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? (
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="mb-1.5 text-sm font-medium text-gray-800">
                        Confirm Password
                      </FormLabel>

                      <FormControl>
                        <Input
                          type={isConfirmPasswordVisible ? "password" : "text"}
                          placeholder="**************"
                          className="h-12 rounded-xl border-gray-200 bg-white px-4 pr-12 shadow-sm transition-all focus:border-[#F04438] focus:ring-2 focus:ring-[#F04438]/20"
                          {...field}
                        />
                      </FormControl>

                      <button
                        type="button"
                        aria-label={
                          isConfirmPasswordVisible
                            ? "Show password"
                            : "Hide password"
                        }
                        className="absolute right-3 top-[35px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                        onClick={() =>
                          setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                        }
                      >
                        {isConfirmPasswordVisible ? (
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
                  text="Create Account"
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

              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <p>Already have account?</p>

                  <Link
  href={WEBSITE_LOGIN}
  className="font-medium text-[#F04438] transition-colors hover:text-[#D9362B] hover:underline"
>
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
