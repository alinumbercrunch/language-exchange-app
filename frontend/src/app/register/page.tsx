import { RegisterForm } from "@/features/register/RegisterForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - Language Exchange",
  description: "Join our language exchange community and start practicing with native speakers",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
