import Image from "next/image";

interface TechLogoProps {
  src: string;
  alt: string;
}

export function TechLogo({ src, alt }: TechLogoProps) {
  return (
    <div className="flex items-center justify-center rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-3">
      <Image
        src={src}
        alt={alt}
        width={32}
        height={32}
        className="opacity-80"
      />
    </div>
  );
}
