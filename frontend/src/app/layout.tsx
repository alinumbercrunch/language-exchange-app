// src/app/layout.tsx
import './globals.css'; // ✅ Make sure Tailwind's directives live here

export const metadata = {
  title: 'Language Exchange',
  description: 'Connect and converse globally',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}