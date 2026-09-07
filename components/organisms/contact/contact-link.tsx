import type { ContactLink } from "./contact.config"

type Props = {
  link: ContactLink
  label: string
  isFirst: boolean
}

export function ContactLinkRow({ link, label, isFirst }: Props) {
  return (
    <div className={isFirst ? "" : "border-t border-white/[0.06]"}>
      <a
        href={link.href}
        target={link.id === "email" ? undefined : "_blank"}
        rel={link.id === "email" ? undefined : "noopener noreferrer"}
        aria-label={`${label}: ${link.display}`}
        className="contact-link group flex items-center justify-between py-6 md:py-8 transition-colors duration-300 hover:text-[hsl(356,96%,32%)]"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/30 group-hover:text-[hsl(356,96%,32%)]/60 transition-colors duration-300">
            {label}
          </span>
          <span className="text-lg md:text-2xl text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
            {link.display}
          </span>
        </div>

        <span className="text-white/20 group-hover:text-[hsl(356,96%,32%)] group-hover:translate-x-1 transition-all duration-300">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </span>
      </a>
    </div>
  )
}
