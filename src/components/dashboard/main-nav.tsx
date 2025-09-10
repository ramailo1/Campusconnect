
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navItems, adminNavItems } from "@/lib/data"
import { Separator } from "../ui/separator"
import type { NavItem } from "@/lib/data"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar"

export function MainNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname()
  const NavLink = ({ item }: { item: NavItem }) => {
    if (item.hidden) return null;
    return (
      <SidebarMenuItem>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard')}
              tooltip={item.label}
              className="justify-start"
            >
              <item.icon />
              <span className="group-[[data-state=collapsed]]:hidden">{item.label}</span>
            </SidebarMenuButton>
          </Link>
      </SidebarMenuItem>
    )
  }

  return (
    <div className={cn(
      "grid items-start gap-2 text-sm font-medium",
      isMobile ? "px-0" : "px-2 lg:px-4"
    )}>
      <SidebarMenu>
        {navItems.map((item) => <NavLink key={item.href} item={item} />)}
      </SidebarMenu>
      <Separator className="my-2" />
      <p className="px-3 text-xs font-semibold text-muted-foreground/80 group-[[data-state=collapsed]]:hidden">Admin</p>
      <SidebarMenu>
        {adminNavItems.map((item) => <NavLink key={item.href} item={item} />)}
      </SidebarMenu>
    </div>
  )
}
