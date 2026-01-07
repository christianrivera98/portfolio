import { Footer } from "../organisms/footer/footer";
import { StaggeredMenu } from "../organisms/navbar/staggered-menu";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <StaggeredMenu />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
