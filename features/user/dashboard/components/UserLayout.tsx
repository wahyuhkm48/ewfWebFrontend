"use client";

import { useRouter } from "next/navigation";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";
import { useUserName } from "../useUserName";

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const userName = useUserName();

  const logout = () => {
    window.localStorage.removeItem("ewf_token");
    window.localStorage.removeItem("ewf_user");
    router.replace("/masuk");
  };

  return (
    <div className="min-h-dvh bg-[#f7f8fa] text-ink">
      <UserSidebar onLogout={logout} />
      <div className="lg:pl-64">
        <UserHeader userName={userName} onLogout={logout} />
        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
