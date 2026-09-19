import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function SiteShell({ children, minimalNav = false }: { children: React.ReactNode; minimalNav?: boolean }) {
  return (
    <>
      <Navbar minimal={minimalNav} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
