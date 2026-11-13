
import Image from "next/image";

type Props = {
  src?: string | null;
  sizes?: string;
  priority?: boolean;
};

export default function NewsImage({
  src,
  sizes,
  priority = false,
}: Props) {
  return (
    <div className="relative h-full w-full">
      {src ? (
        <Image
          src={src}
          alt="Berita"
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-navy text-white/50">
          Tidak ada gambar
        </div>
      )}
    </div>
  );
}
