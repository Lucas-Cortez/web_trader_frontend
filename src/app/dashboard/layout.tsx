import { Navbar } from "@/components/common/Navbar";
import { InitializeChartsProvider } from "@/providers/InitializeChartsProvider";
// import { orderService } from "@/services";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  // console.log(session);

  if (!session) redirect(`/entrar`);
  //
  // const orders = await orderService.getUserOrders(session?.accessToken || "");
  // console.log(orders);

  return (
    <InitializeChartsProvider>
      <div className="min-h-screen h-full bg-application">
        <Navbar />
        <div className="pt-16">{children}</div>
      </div>
    </InitializeChartsProvider>
  );
}
