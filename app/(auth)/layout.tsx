export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-gray-100 flex flex-col items-center justify-center p-4 selection:bg-[#FFC800] selection:text-black">
      {children}
    </div>
  );
}
