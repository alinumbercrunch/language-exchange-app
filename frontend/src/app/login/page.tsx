import { LoginForm } from "@/features/login/LoginForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Language Exchange",
  description: "Sign in to your Language Exchange account",
};

export default function LoginPage() {
  return <LoginForm />;
}
