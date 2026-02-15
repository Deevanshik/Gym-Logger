import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Logout from "@/components/Logout";

async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth");
  }

  return (
    <div>
      <div>Hi {session?.user.name}</div>
      <Logout/>
    </div>
  );
};

export default Dashboard;
