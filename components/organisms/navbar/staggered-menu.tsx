"use client";

import { useStaggeredMenu } from "@/hooks/useStaggeredMenu";
import { MenuPreview } from "./menu-preview";
import { NAV_ITEMS, SOCIAL_ITEMS } from "./nav.config";

interface StaggeredMenuProps {
  isFixed?: boolean;
}

export function StaggeredMenu({ isFixed = true }: StaggeredMenuProps) {
  const {
    open,
    toggleMenu,
    activePreview,
    setActivePreview,
    listRef,
  } = useStaggeredMenu();

  return (
    <div
      className={`relative z-40 ${
        isFixed ? "fixed inset-0 overflow-hidden" : ""
      }`}
      data-open={open || undefined}
    >
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-transparent"
      >
        <div className="font-semibold tracking-tight">Christian Rivera</div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[hsl(var(--primary))]"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-40 w-full bg-[hsl(var(--background))] md:w-[38vw] ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex h-full">
          <div className="w-1/2">
            <MenuPreview src={activePreview} />
          </div>

          <div className="flex w-full flex-col justify-center gap-6 p-12 md:w-1/2">
            <ul ref={listRef} className="flex flex-col gap-6">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.label}>
                  <a
                    href={item.link}
                    aria-label={item.ariaLabel}
                    onMouseEnter={() => setActivePreview(item.previewImage)}
                    onFocus={() => setActivePreview(item.previewImage)}
                    className="block text-4xl font-semibold uppercase tracking-tight transition-colors hover:text-[hsl(var(--primary))]"
                  >
                    {item.label}
                    <span className="ml-3 text-sm text-[hsl(var(--muted))]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <footer className="pt-12">
              <ul className="flex gap-4">
                {SOCIAL_ITEMS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-[hsl(var(--primary))]"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </footer>
          </div>
        </div>
      </aside>
    </div>
  );
}
