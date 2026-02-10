"use client"

import { ThemeProvider } from "next-themes"
import { PreloaderProvider } from "@/components/organisms/preloader/preloader-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <PreloaderProvider>
        {children}
      </PreloaderProvider>
    </ThemeProvider>
  )
}
