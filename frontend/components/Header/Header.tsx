import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserMenu from "./UserMenu";
import Link from "next/link";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const { name } = session.user;

  return (
    <div className="flex items-center justify-between">
      {/* User name */}
      <h1 className="text-2xl font-semibold">
        <span className="text-[#e62e2e]">Welcome</span> {name}
      </h1>

      <div className="flex items-center gap-6">
        <Link
          href="/exercises"
          className="hidden md:inline-block px-1.5 py-1 bg-[#e62e2e] text-[#0d0d0d] font-bold uppercase tracking-[0.15em] font-['Barlow_Condensed'] hover:bg-[#c31b1b]"
        >
          Show Exercises
        </Link>

        <UserMenu name={name} />
      </div>
    </div>
  );
}
