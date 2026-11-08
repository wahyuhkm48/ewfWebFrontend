"use client";

import { useRouter } from "next/navigation";
import SpecularButton, {
  type SpecularButtonProps,
} from "@/components/ui/SpecularButton";

type Props = Omit<SpecularButtonProps, "onClick" | "type"> & {
  href: string;
};

export default function SpecularLink({ href, children, ...props }: Props) {
  const router = useRouter();

  return (
    <SpecularButton {...props} onClick={() => router.push(href)}>
      {children}
    </SpecularButton>
  );
}