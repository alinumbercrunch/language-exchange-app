import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { getUserLocale } from "@/services/locale";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
	title: "Language Exchange",
	description: "Connect and converse globally"
};

const locale = await getUserLocale();
const messages = await getMessages();

/**
 * The root layout for the application.
 * It sets up the basic HTML structure and includes global styles.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-white text-gray-900">
				<NextIntlClientProvider messages={messages} locale={locale}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
