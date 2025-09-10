"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navItems, adminNavItems } from "@/lib/data"
import { Separator } from "../ui/separator"

export function MainNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname()
  const NavLink = ({ item }: { item: { href: string, icon: React.ElementType, label: string } }) => (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard')) && "bg-primary/10 text-primary"
      )}
    >
      <item.icon className="h-4 w-4" />
      {item.label}
    </Link>
  )

  return (
    <nav className={cn(
      "grid items-start gap-2 text-sm font-medium",
      isMobile ? "px-0" : "px-2 lg:px-4"
    )}>
      {navItems.map((item) => <NavLink key={item.href} item={item} />)}
      <Separator className="my-2" />
      <p className="px-3 text-xs font-semibold text-muted-foreground/80">Admin</p>
      {adminNavItems.map((item) => <NavLink key={item.href} item={item} />)}
    </nav>
  )
}
