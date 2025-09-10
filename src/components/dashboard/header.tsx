
'use client';
import Link from "next/link"
import {
  GraduationCap,
  Menu,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MainNav } from "./main-nav"
import { UserNav } from "./user-nav"
import { Notifications } from "./notifications"
import { LanguageSwitcher } from "./language-switcher"
import { DebugPanel } from "./debug-panel"
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Button variant="outline" size="icon" className="shrink-0 md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search modules, users, or courses..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
        <DebugPanel />
        <Notifications />
        <UserNav />
      </div>
    </header>
  )
}
