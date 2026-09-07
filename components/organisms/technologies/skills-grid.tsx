import Image from "next/image"
import { SKILL_LOGOS } from "./technologies.config"

export function SkillsGrid() {
  return (
    <div className="tech-skills grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-6">
      {SKILL_LOGOS.map((skill) => (
        <div
          key={skill.label}
          className="skill-logo group flex min-h-11 items-center justify-center"
        >
          <Image
            src={skill.file}
            alt={skill.label}
            width={96}
            height={96}
            unoptimized
            className="size-14 opacity-70 [filter:brightness(0)_invert(1)] transition-all duration-300 ease-out group-hover:scale-110 group-hover:opacity-100 sm:size-16 md:size-20"
          />
        </div>
      ))}
    </div>
  )
}
