import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import { z } from "zod";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        await connectDB()
        const payload = await request.json()

        const validationSchema = zSchema.pick({
            email: true
        }).extend({
            password: z.string()
        })

        const validatedData = validationSchema.safeParse(payload)
        if (!validatedData.success) {
            return response(false, 401, 'Invalid or missing input field.', validatedData.error)
        }

        const { email, password } = validatedData.data

        // get user data
        const getUser = await UserModel.findOne({ deletedAt: null, email }).select("+password")
        if (!getUser) {
            return response(false, 400, 'Invalid login credentials.')
        }

        // resend email verification link if unverified
        if (!getUser.isEmailVerified) {
            const secret = new TextEncoder().encode(process.env.SECRET_KEY);

            const token = await new SignJWT({
                userId: getUser._id.toString(),
            })
                .setIssuedAt()
                .setExpirationTime("1h")
                .setProtectedHeader({ alg: "HS256" })
                .sign(secret);

            const mailResponse = await sendMail(
                "Welcome to Step Up - Verify Your Email",
                email,
                emailVerificationLink(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
                )
            );

            if (!mailResponse.success) {
                return response(false, 500, mailResponse.message);
            }

            return response(
                false,
                401,
                "Your email is not verified. We have sent a verification link to your registered email address."
            );
        }

        // password verification
        const isPasswordVerified = await getUser.comparePassword(password)

        if (!isPasswordVerified) {
            return response(false, 400, 'Invalid login credentials.')
        }

        const loggedInUserData = {
            _id: getUser._id,
            role: getUser.role,
            name: getUser.name,
            avatar: getUser.avatar,
        }

        const secret = new TextEncoder().encode(process.env.SECRET_KEY)
        const token = await new SignJWT(loggedInUserData)
            .setIssuedAt()
            .setExpirationTime('24h')
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret)

        const cookieStore = await cookies()

        cookieStore.set({
            name: 'access_token',
            value: token,
            httpOnly: process.env.NODE_ENV === 'production',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })

        return response(true, 200, 'Login successful.', loggedInUserData)
    } catch (error) {
        return catchError(error)
    }
}