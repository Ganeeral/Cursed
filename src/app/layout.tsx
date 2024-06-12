import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Видеохостинг - Flix",
  description: "Сайт Flix - ваш источник для стриминга видео.",
  icons: {
    icon: {
      url: "../faviconWhite.svg",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-background-main -z-10">
        {children}
      </body>
    </html>
  );
}
