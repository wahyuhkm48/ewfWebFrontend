import Image from "next/image";

type Props = {
  src: string | null;
  sizes: string;
  priority?: boolean;
};

/** Gambar berita; bila tidak ada, tampil latar navy polos. */
export default function NewsImage({ src, sizes, priority }: Props) {
  if (!src) {
    return <div className="absolute inset-0 bg-navy" aria-hidden="true" />;
  }

  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );
}