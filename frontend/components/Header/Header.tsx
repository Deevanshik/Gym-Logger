import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserMenu from "./UserMenu";
import Link from "next/link";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  const { name } = session.user;

  return (
    <header className="w-full flex items-center justify-between gap-6">
      {/* LEFT */}
      <div className="flex items-center gap-6 min-w-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="10" width="3" height="8" rx="1" fill="#e62e2e" />
            <rect x="4" y="8" width="3" height="12" rx="1" fill="#e62e2e" />
            <rect x="7" y="12.5" width="14" height="3" rx="1" fill="#e8e8e8" />
            <rect x="21" y="8" width="3" height="12" rx="1" fill="#e62e2e" />
            <rect x="24" y="10" width="3" height="8" rx="1" fill="#e62e2e" />
          </svg>

          <span className="font-['Barlow_Condensed'] font-bold uppercase tracking-[0.15em] text-[#e8e8e8] text-lg leading-none whitespace-nowrap">
            Gym<span className="text-[#e62e2e]">Logger</span>
          </span>
        </Link>

        {/* Welcome text */}
        <h1 className="text-xl font-semibold truncate">
          <span className="text-[#e62e2e]">Welcome</span> {name}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 shrink-0">
        <Link
          href="/exercise-templates"
          className="hidden md:inline-flex items-center px-3 py-1.5 bg-[#e62e2e] text-[#0d0d0d] font-bold uppercase tracking-[0.15em] font-['Barlow_Condensed'] hover:bg-[#c31b1b]"
        >
          Show Exercises
        </Link>

        <UserMenu name={name} />
      </div>
    </header>
  );
}

