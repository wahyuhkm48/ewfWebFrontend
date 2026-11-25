import UserLayout from "@/features/user/dashboard/components/UserLayout";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <UserLayout>{children}</UserLayout>;
}
