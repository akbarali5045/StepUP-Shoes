import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonLoading from "./ButtonLoading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import axios from "axios";
import { showToast } from "@/lib/showToast";
const OTPVerification = ({ email, onSubmit, loading }) => {
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });
const [isResendingOtp, setisResendingOtp]=useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });
const handleOtpVerification =async (values) =>{
onSubmit(values)
}
const resendOTP = async () => {
    try {
        setisResendingOtp(true)
        const { data: resendOtpResponse } = await axios.post('/api/auth/resend-otp', { email })
        if (!resendOtpResponse.success) {
            throw new Error(resendOtpResponse.message)
        }
        showToast('success', resendOtpResponse.message)
    } catch (error) {
        showToast('error', error.message)
    } finally {
        setisResendingOtp(false)
    }
}



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOtpVerification)}>
         <div className='text-center'>
          <h1 className='text-2xl font-bold mb-2'>Please complete verification</h1>
          <p className='text-md'>We have sent an One-time Password (OTP) to your registered email address. The OTP is valid for 10 minutes only.</p>
        </div>
        <div className="mb-3 mt-5 flex justify-center">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1.5 text-sm font-semibold text-gray-800">
                 One-time Password (OTP)
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
    <InputOTPGroup>
        <InputOTPSlot className="text-xl size-10" index={0} />
        <InputOTPSlot className="text-xl size-10" index={1} />
        <InputOTPSlot className="text-xl size-10" index={2} />
        <InputOTPSlot className="text-xl size-10" index={3} />
        <InputOTPSlot className="text-xl size-10" index={4} />
        <InputOTPSlot className="text-xl size-10" index={5} />
    </InputOTPGroup>
</InputOTP>
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
            text="Verify"
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
        
       <div className='text-center mt-5'>
   {!isResendingOtp ?
        <button onClick={resendOTP} type='button'
        className='text-blue-500 cursor-pointer
        hover:underline'>Resend OTP</button>
        :
        <span className='text-md'>Resending....</span>
        }
</div>
</div>
      </form>
    </Form>
  );
};

export default OTPVerification;
