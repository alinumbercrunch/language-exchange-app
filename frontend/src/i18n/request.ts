import { getRequestConfig } from "next-intl/server";

import { getUserLocale } from "@/services/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  const messageFiles = ["common"];

  // Load and merge all message files
  const messages = {};

  for (const file of messageFiles) {
    try {
      const fileMessages = (await import(`../messages/${locale}/${file}.json`)).default;
      Object.assign(messages, fileMessages);
    } catch {
      console.warn(`Could not load ${file}.json for locale ${locale}`);
    }
  }

  return {
    locale,
    messages,
  };
});
