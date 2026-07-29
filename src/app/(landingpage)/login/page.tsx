import { AuthForm } from "@/features/auth/components/auth-form"

export const metadata = {
  title: "Log in — YOUTHs",
  description: "Log in to your YOUTHs account to register for events and activities.",
}

export default function LoginPage() {
  return <AuthForm mode="login" />
}
