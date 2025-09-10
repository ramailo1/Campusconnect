
'use client';

import Link from "next/link"
import {
  GraduationCap
} from "lucide-react"

import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav"
import Header from "@/components/dashboard/header"
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar"
import { useState, useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [platformName, setPlatformName] = useState("CampusConnect");

  useEffect(() => {
    const savedName = localStorage.getItem("platformName");
    if (savedName) {
      setPlatformName(savedName);
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
            <div className="flex h-full max-h-screen flex-col gap-2">
              <SidebarHeader className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="group-[[data-state=collapsed]]:hidden">{platformName}</span>
                </Link>
                 <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <MainNav />
              </SidebarContent>
            </div>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
