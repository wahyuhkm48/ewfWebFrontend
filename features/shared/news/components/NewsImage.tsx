import Image from "next/image";

type Props = {
  src?: string | null;
  sizes?: string;
  priority?: boolean;
  /** Gambar mengendap dari agak besar saat kartunya muncul (butuh RevealGroup di atasnya). */
  settle?: boolean;
};

export default function NewsImage({ src, sizes, priority = false, settle = false }: Props) {
  return (
    <div className="relative h-full w-full">
      {src ? (
        <Image
          src={src}
          alt="Berita"
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover transition duration-500 group-hover:scale-105 ${
            settle ? "reveal-image" : ""
          }`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-navy text-white/50">
          Tidak ada gambar
        </div>
      )}
    </div>
  );
}