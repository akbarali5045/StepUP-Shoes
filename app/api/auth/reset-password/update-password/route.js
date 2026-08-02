import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function PUT(request) {
    try {
        await connectDB()
        const payload = await request.json()
        const validationSchema = zSchema.pick({
            email: true, password: true
        })

        const validatedData = validationSchema.safeParse(payload)
        if (!validatedData.success) {
            return response(false, 401, 'Invalid or missing input field.', validatedData.error)
        }

        const { email, password } = validatedData.data

        const cookieStore = await cookies()
        const resetToken = cookieStore.get("password_reset_token")?.value

        if (!resetToken) {
            return response(false, 401, "Unauthorized: OTP verification required.")
        }

        try {
            const secret = new TextEncoder().encode(process.env.SECRET_KEY)
            const { payload: tokenPayload } = await jwtVerify(resetToken, secret)
            if (!tokenPayload.resetAuthorized || tokenPayload.email !== email) {
                return response(false, 401, "Unauthorized: Invalid reset session.")
            }
        } catch (err) {
            return response(false, 401, "Unauthorized: Invalid or expired reset session.")
        }

        const getUser = await UserModel.findOne({ deletedAt: null, email }).select("+password")

        if (!getUser) {
            return response(false, 404, 'User not found.')
        }

        getUser.password = password
        await getUser.save()

        cookieStore.delete("password_reset_token")

        return response(true, 200, 'Password update success.')

    } catch (error) {
        return catchError(error)
    }
}