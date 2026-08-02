import { catchError, response } from "@/lib/helperFunction";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.set({
      name: "access_token",
      value: "",
      maxAge: 0,
      path: "/",
    });

    return response(true, 200, "Logout successful.");
  } catch (error) {
    return catchError(error);
  }
}
