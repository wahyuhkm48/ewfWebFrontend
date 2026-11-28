import PelamarFormLoader from "@/features/admin/pelamar/PelamarFormLoader";

export default async function Page({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  return <PelamarFormLoader id={id} />;
}