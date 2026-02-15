"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UserMenu({
  name,
}: {
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const initial = name.charAt(0).toUpperCase();
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 rounded-full bg-[#e62e2e] text-[#0d0d0d] flex items-center justify-center text-xl font-bold"
      >
        {initial}
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-44 rounded-lg border bg-[#0d0d0d] shadow overflow-hidden
    transform transition-all duration-100 ease-out
    ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
  `}
      >
        <div className="px-4 py-2 border-b">
          <p className="text-sm font-medium">{name}</p>
        </div>

        <ul className="text-sm">
          <li className="px-4 py-2 hover:bg-[#e62e2e] transition-colors cursor-pointer">
            Profile
          </li>
          <li className="px-4 py-2 hover:bg-[#e62e2e] transition-colors cursor-pointer">
            Settings
          </li>
          <li
            className="px-4 py-2 text-[#e62e2e] transition-colors cursor-pointer"
            onClick={() => signOut()}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
