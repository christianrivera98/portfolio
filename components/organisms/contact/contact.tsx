"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { useContactAnimations } from "@/hooks/useContactAnimations"
import { ContactLinkRow } from "./contact-link"
import { CONTACT_LINKS } from "./contact.config"

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const t = useTranslations("Contact")

  useContactAnimations(containerRef, titleRef)

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 rounded-full bg-[hsl(356,96%,22%)] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl px-6 md:px-12 lg:pl-28 lg:pr-0">
        {/* CTA Title */}
        <h2
          ref={titleRef}
          className="font-serif-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05] whitespace-pre-line"
          style={{ perspective: "500px" }}
        >
          {t("title")}
        </h2>

        {/* Availability Status */}
        <div className="contact-status flex items-center gap-3 mt-8 mb-14 md:mb-20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-base text-white/50">
            {t("status")}
          </span>
        </div>

        {/* Contact Links */}
        <div className="contact-links">
          {CONTACT_LINKS.map((link, i) => (
            <ContactLinkRow
              key={link.id}
              link={link}
              label={t(`links.${link.id}`)}
              isFirst={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
