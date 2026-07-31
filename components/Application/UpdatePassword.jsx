"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/showToast";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Application/ButtonLoading";

const UpdatePassword = ({ email }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = zSchema
    .pick({
      password: true,
    })
    .extend({
      confirmPassword: zSchema.shape.password,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and confirm password must match.",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleUpdatePassword = async (values) => {
    try {
      setLoading(true);

      const { data: response } = await axios.put(
        "/api/auth/reset-password/update-password",
        {
          email,
          password: values.password,
        },
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      showToast("success", response.message);
      router.push(WEBSITE_LOGIN);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Update Password
        </h1>

        <p className="mt-1.5 text-sm text-gray-500">
          Enter your new password below.
        </p>
      </div>

      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdatePassword)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5 text-sm font-medium text-gray-800">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5 text-sm font-medium text-gray-800">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Re-enter new password"
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
                loading={loading}
                type="submit"
                text="Update Password"
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePassword;