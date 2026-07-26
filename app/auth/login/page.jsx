"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Logo from "@/public/assets/images/logo.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import Link from "next/link";
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
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min("3", "Password field is required."),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLoginSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Card className="w-[400px] bg-fuchsia-300">
      <CardContent>
        <div className="flex justify-center">
          <Image
            src={Logo.src}
            width={Logo.width}
            height={Logo.height}
            alt="logo"
            className="max-w-[150px]"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login Into Account</h1>
          <p>Login into your account by filling out the form below.</p>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={isTypePassword ? "password" : "text"}
                          placeholder="**************"
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute top-1/2 right-2 cursor-pointer"
                        type="button"
                        onClick={() => setIsTypePassword(!isTypePassword)}
                      >
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
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
                  className="w-full
    cursor-pointer"
                />
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center gap-1">
                  <p>Don't have account?</p>
                  <Link href="" className="text-primary underline">
                    Create account!
                  </Link>
                </div>
                <div className="mt-3">
                  <Link href="" className="text-primary underline">
                    Forgot password?
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

export default LoginPage;
