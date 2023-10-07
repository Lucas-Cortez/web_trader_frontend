import { Navbar } from "@/components/app/Navbar";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const session = await getServerSession(authOptions);

  // if (!session) redirect(`/entrar`);

  return (
    <div className="min-h-screen h-full bg-application">
      <Navbar />
      <div className="pt-16">{children}</div>
    </div>
  );
}
