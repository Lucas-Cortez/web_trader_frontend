import { Navbar } from "@/components/app/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-application">
      <Navbar />
      {children}
    </div>
  );
}
