"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
// Icons from lucide-react
import { Search, ChevronDown, Menu, X, ArrowRight, Sparkles } from "lucide-react";
// Icons from react-icons
import { FiShoppingBag, FiUser, FiHeart, FiSearch } from "react-icons/fi";
import { RiLeafLine } from "react-icons/ri";

const shopCategories = [
  { name: "All Products", href: "/shop", desc: "Explore our full bamboo range" },
  { name: "Kitchenware", href: "/shop?category=Kitchen", desc: "Mugs, utensils & cutting boards" },
  { name: "Dining & Tableware", href: "/shop?category=Dining", desc: "Serving bowls, plates & trays" },
  { name: "Storage & Home", href: "/shop?category=Storage", desc: "Eco storage jars & organizers" },
];

const trendingSearches = ["Bamboo Mug", "Serving Bowl", "Cutting Board", "Utensil Set", "Storage Jar"];

const navLinks = [
  { label: "Shop", href: "/shop", hasDropdown: true },
  { label: "Our Story", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ minimal = false }: { minimal?: boolean }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [cartCount, setCartCount] = useState(2); // Default badge count as shown in design mockup

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsShopHovered(false);
  }, [pathname]);

  return (
    <>
      {/* Top Announcement Bar */}
      {showAnnouncement && !minimal && (
        <div className="bg-primary px-4 py-2 text-xs font-medium text-leaf transition-all">
          <Container className="flex items-center justify-between gap-4">
            <div className="mx-auto flex items-center justify-center gap-2 text-center">
              <RiLeafLine className="h-3.5 w-3.5 text-accent animate-pulse" />
              <span>Complimentary shipping on orders over $75</span>
              <span className="hidden opacity-60 md:inline">•</span>
              <span className="hidden md:inline">100% Sustainable & Handcrafted Bamboo Homeware</span>
            </div>
            <button
              type="button"
              onClick={() => setShowAnnouncement(false)}
              aria-label="Dismiss announcement"
              className="text-leaf/70 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </Container>
        </div>
      )}

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "border-primary/15 bg-cream/95 backdrop-blur-md shadow-sm"
            : "border-primary/10 bg-cream/90 backdrop-blur-sm"
        }`}
      >
        <Container className="flex h-[76px] items-center justify-between gap-6">
          {/* Left Branding: Logo + Subtitle */}
          <div className="flex items-center gap-3">
            <Link href="/" className="group flex items-center gap-3">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.14em] text-foreground font-bold group-hover:text-primary transition-colors">
                VANA
              </span>
              <span className="h-5 w-[1px] bg-foreground/20 hidden sm:inline-block" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted/80 hidden sm:inline-block">
                Bamboo Homeware
              </span>
            </Link>
          </div>

          {/* Center Navigation Links */}
          {!minimal && (
            <nav className="hidden items-center gap-9 text-sm font-medium text-foreground md:flex">
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.href}
                      className="relative py-4"
                      onMouseEnter={() => setIsShopHovered(true)}
                      onMouseLeave={() => setIsShopHovered(false)}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-1.5 transition-colors py-1 ${
                          isActive ? "text-primary font-semibold" : "hover:text-primary"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isShopHovered ? "rotate-180 text-primary" : "text-muted"
                          }`}
                        />
                      </Link>

                      {/* Accent Active Indicator line matching design */}
                      {isActive && (
                        <span className="absolute bottom-2 left-0 right-0 h-[2px] rounded-full bg-accent" />
                      )}

                      {/* Dropdown Menu */}
                      {isShopHovered && (
                        <div className="absolute left-1/2 top-full w-[480px] -translate-x-1/2 rounded-xl border border-primary/10 bg-white p-6 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                                Categories
                              </p>
                              <div className="space-y-1">
                                {shopCategories.map((cat) => (
                                  <Link
                                    key={cat.name}
                                    href={cat.href}
                                    className="block rounded-lg p-2 hover:bg-leaf transition-colors group"
                                  >
                                    <div className="text-sm font-semibold text-foreground group-hover:text-primary">
                                      {cat.name}
                                    </div>
                                    <div className="text-[11px] text-muted line-clamp-1">
                                      {cat.desc}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <div className="rounded-lg bg-leaf/80 p-4 flex flex-col justify-between border border-primary/10">
                              <div>
                                <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary mb-2">
                                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                                  Featured Collection
                                </div>
                                <h4 className="font-serif text-lg font-medium text-foreground leading-snug">
                                  Handcrafted Bamboo Essentials
                                </h4>
                                <p className="mt-1 text-xs text-muted leading-relaxed">
                                  Natural textures, sustainable durability for your living space.
                                </p>
                              </div>
                              <Link
                                href="/shop"
                                className="mt-4 flex items-center gap-1 text-xs font-bold text-primary hover:text-accent transition-colors"
                              >
                                Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-4 transition-colors ${
                      isActive ? "text-primary font-semibold" : "hover:text-primary"
                    }`}
                  >
                    <span className="py-1">{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-2 left-0 right-0 h-[2px] rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Action Icons */}
          {!minimal ? (
            <div className="flex items-center gap-4 text-foreground">
              {/* Search Toggle Icon */}
              <button
                type="button"
                aria-label="Open search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-primary/5 text-foreground hover:text-primary transition-colors"
              >
                <Search className="h-5 w-5 stroke-[1.8]" />
              </button>

              {/* User Account Link Icon */}
              <Link
                href="/contact"
                aria-label="User Account"
                className="hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-primary/5 text-foreground hover:text-primary transition-colors"
              >
                <FiUser className="h-5 w-5 stroke-[1.8]" />
              </Link>

              {/* Cart Icon with Terracotta Badge */}
              <button
                type="button"
                aria-label={`Cart with ${cartCount} items`}
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-primary/5 text-foreground hover:text-primary transition-colors"
              >
                <FiShoppingBag className="h-5 w-5 stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-[11px] font-bold text-white shadow-sm ring-2 ring-cream">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-primary/5 md:hidden text-foreground hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          ) : (
            <Link
              href="/"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Back to main site <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </Container>
      </header>

      {/* Expandable Quick Search Bar */}
      {isSearchOpen && (
        <div className="sticky top-[76px] z-30 border-b border-primary/10 bg-white/95 px-4 py-4 shadow-md backdrop-blur-md animate-in fade-in slide-in-from-top-1">
          <Container className="max-w-3xl">
            <div className="relative flex items-center">
              <FiSearch className="absolute left-4 h-5 w-5 text-muted" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bamboo homeware, mugs, bowls, storage..."
                className="w-full rounded-full border border-primary/20 bg-cream/50 py-3 pl-12 pr-10 text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs font-semibold text-muted hover:text-primary"
                >
                  Clear
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 text-muted hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Trending Quick Suggestions */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto text-xs text-muted">
              <span className="font-semibold text-primary shrink-0">Popular:</span>
              {trendingSearches.map((term) => (
                <Link
                  key={term}
                  href={`/shop?search=${encodeURIComponent(term)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="rounded-full bg-leaf px-3 py-1 hover:bg-primary/10 hover:text-primary transition-colors shrink-0"
                >
                  {term}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-cream md:hidden animate-in fade-in slide-in-from-right duration-200">
          <div className="flex h-[76px] items-center justify-between px-6 border-b border-primary/10">
            <Link href="/" className="font-serif text-3xl tracking-[0.14em] font-bold text-foreground">
              VANA
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-primary/5 text-foreground"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-2xl font-serif py-2 border-b border-primary/10 flex items-center justify-between ${
                      isActive ? "text-primary font-bold" : "text-foreground hover:text-primary"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-5 w-5 text-primary/40" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {shopCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="rounded-lg bg-white p-3 text-xs font-medium text-foreground shadow-sm hover:text-primary"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-primary/10 bg-leaf/60 flex items-center justify-between text-xs text-muted">
            <span>© VANA Bamboo Homeware</span>
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              Help & Support
            </Link>
          </div>
        </div>
      )}

      {/* Slide-Over Quick Cart Drawer */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setIsCartDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md bg-cream h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10 bg-white">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-bold text-foreground">Your Cart ({cartCount})</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-primary/10 text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-white border border-primary/10 shadow-xs">
                <div className="h-20 w-20 rounded-lg bg-leaf flex items-center justify-center font-serif text-xs text-primary font-semibold">
                  Bamboo Mug
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-base font-semibold text-foreground">Bamboo Mug</h4>
                    <p className="text-xs text-muted">Natural Finish · 350ml</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-primary">$24.00</span>
                    <span className="text-xs text-muted">Qty: 1</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white border border-primary/10 shadow-xs">
                <div className="h-20 w-20 rounded-lg bg-leaf flex items-center justify-center font-serif text-xs text-primary font-semibold">
                  Serving Bowl
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-base font-semibold text-foreground">Serving Bowl</h4>
                    <p className="text-xs text-muted">Hand-carved Bamboo</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-primary">$42.00</span>
                    <span className="text-xs text-muted">Qty: 1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtotal & Checkout Actions */}
            <div className="p-6 border-t border-primary/10 bg-white space-y-4">
              <div className="flex justify-between text-sm font-medium text-foreground">
                <span>Subtotal</span>
                <span className="font-bold text-primary text-base">$66.00</span>
              </div>
              <p className="text-xs text-muted">Taxes and shipping calculated at checkout.</p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="rounded-xl border border-primary/20 py-3 text-center text-sm font-semibold text-foreground hover:bg-leaf transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
