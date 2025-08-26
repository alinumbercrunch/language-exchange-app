import { HomePage } from "@/features/home/HomePage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Language Exchange - Connect and Converse Globally",
  description:
    "Join our language exchange community to practice languages with native speakers from around the world",
};

export default function Home() {
  return <HomePage />;
}
