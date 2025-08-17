import './globals.css'; // ✅ Make sure Tailwind's directives live here

export const metadata = {
  title: 'Language Exchange',
  description: 'Connect and converse globally',
};

/**
 * The root layout for the application.
 * It sets up the basic HTML structure and includes global styles.
 */
  export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}