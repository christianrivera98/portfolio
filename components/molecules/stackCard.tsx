import Image from "next/image";
import { motion } from "framer-motion";

interface StackCardProps {
  src: string;
  alt: string;
  index: number;
  total: number;
}

export function StackCard({ src, alt, index, total }: StackCardProps) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center rounded-xl bg-[hsl(var(--background))] border border-[hsl(var(--border))]"
      animate={{
        rotateZ: (total - index - 1) * 2,
        scale: 1 - index * 0.04,
        y: index * 6,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 22,
      }}
      style={{ transformOrigin: "30% 10%" }}
    >
      <Image
        src={src}
        alt={alt}
        width={68}
        height={68}
        className="opacity-90"
      />
    </motion.div>
  );
}
