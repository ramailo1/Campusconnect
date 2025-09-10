
"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookCopy, CalendarDays, Users, Library, Activity } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { navItems, appointments, libraryBooks, users } from "@/lib/data"
import { useMemo, useState } from "react"


export default function Dashboard() {
  // In a real app, these would be managed in a global state or settings context
  const [displayedModules, setDisplayedModules] = useState([
    "/dashboard/courses",
    "/dashboard/appointments",
    "/dashboard/library",
  ])
  const [displayedMetrics, setDisplayedMetrics] = useState([
    "online-users",
    "booked-books",
    "total-appointments",
  ])

  const modules = useMemo(() => {
    return navItems.filter(item => displayedModules.includes(item.href) && item.href !== '/dashboard')
  }, [displayedModules])

  const metrics = useMemo(() => {
    const onlineUsers = Math.floor(Math.random() * users.length) + 1;
    const bookedBooks = libraryBooks.filter(b => b.borrowedBy).length
    const totalAppointments = appointments.length

    return [
      {
        key: "online-users",
        icon: Users,
        label: "Online Users",
        value: onlineUsers,
        description: "Users currently active",
      },
      {
        key: "booked-books",
        icon: Library,
        label: "Books Checked Out",
        value: bookedBooks,
        description: "Books currently on loan",
      },
      {
        key: "total-appointments",
        icon: CalendarDays,
        label: "Total Appointments",
        value: totalAppointments,
        description: "Scheduled appointments",
      },
    ].filter(m => displayedMetrics.includes(m.key))
  }, [displayedMetrics])


  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.label}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.label}>
            <CardHeader className="p-0 overflow-hidden rounded-t-lg">
              <Image src={module.image!} alt={module.label} width={600} height={400} className="aspect-video object-cover" data-ai-hint={module.imageHint} />
            </CardHeader>
            <CardHeader>
              <div className="flex items-center gap-4">
                <module.icon className="h-8 w-8 text-primary" />
                <CardTitle>{module.label}</CardTitle>
              </div>
              <CardDescription className="mt-2">{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={module.href}>
                <Button className="w-full">
                  Go to {module.label}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
       {modules.length === 0 && metrics.length === 0 && (
          <Card className="flex flex-col items-center justify-center p-12 text-center col-span-full">
              <CardHeader>
                  <CardTitle>Dashboard is Empty</CardTitle>
                  <CardDescription>Go to Settings {'>'} Dashboard to add modules and analytics.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Link href="/dashboard/settings">
                      <Button>Go to Settings</Button>
                  </Link>
              </CardContent>
          </Card>
      )}
    </>
  )
}
