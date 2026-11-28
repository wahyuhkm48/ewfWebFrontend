import LowonganEditLoader from "@/features/admin/lowongan/LowonganEditLoader";

export default async function Page({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  return <LowonganEditLoader id={id} />;
}