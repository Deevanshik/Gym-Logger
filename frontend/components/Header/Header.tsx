import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserMenu from "./UserMenu";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null; 
  }

  const { name, email } = session.user;

  return (
    <div className="flex items-center justify-between">
      {/* 1. User name instead of Dashboard */}
      <h1 className="text-2xl font-semibold">
        <span className="text-[#e62e2e]">Welcome</span> {name}
      </h1>

      {/* 2. User menu */}
      <UserMenu name={name} email={email} />
    </div>
  );
}
