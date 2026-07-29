import { AuthForm } from "@/features/auth/components/auth-form"

export const metadata = {
  title: "Sign up — YOUTHs",
  description: "Create a YOUTHs account to join projects, events and activities.",
}

export default function SignupPage() {
  return <AuthForm mode="signup" />
}
