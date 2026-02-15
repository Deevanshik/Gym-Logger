"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <button
      onClick={handleClick}
      className="rounded bg-black px-4 py-1.5 text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
    >
      Logout
    </button>
  );
};

export default Logout;
