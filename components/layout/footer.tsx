import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerGroups } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-cream py-12">
      <Container>
        <div className="grid gap-10 border-b border-primary/10 pb-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <Link className="font-serif text-4xl tracking-[0.12em] text-text" href="/">
              VANA
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Bamboo homeware shaped for slower, better everyday rituals.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-text">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link className="hover:text-primary" href="#">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-sm font-semibold text-text">Stay in touch</h3>
            <form className="mt-4 flex rounded-md border border-primary/15 bg-white p-1">
              <input className="min-w-0 flex-1 px-3 text-xs outline-none" placeholder="Enter your email address" />
              <button className="rounded bg-primary px-4 py-2 text-xs font-semibold text-white" type="submit">
                Subscribe
              </button>
            </form>
            <div className="mt-5 flex gap-4 text-sm text-muted">
              <Link href="#">IG</Link>
              <Link href="#">FB</Link>
              <Link href="#">PT</Link>
              <Link href="#">YT</Link>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>&copy; 2026 VANA. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
