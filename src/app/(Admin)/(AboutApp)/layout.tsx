import "@/app/globals.css";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="page" className="flex-grow h-full bg-backgroundAbout">
      {children}
    </div>
  );
}
