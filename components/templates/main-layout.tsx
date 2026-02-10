import { Footer } from "../organisms/footer/footer"
import { Navigation } from "../organisms/navbar/navigation"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
