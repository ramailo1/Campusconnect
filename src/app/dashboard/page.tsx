
"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookCopy, CalendarDays, Users, Library, Activity, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { navItems as allNavItems, appointments, libraryBooks, users, currentUser } from "@/lib/data"
import type { Appointment, User } from "@/lib/data";
import { useMemo, useState, useEffect } from "react"
import { formatDistanceToNow, isFuture } from 'date-fns'


function Countdown({ to }: { to: Date }) {
  const [time, setTime] = useState(formatDistanceToNow(to, { addSuffix: true }))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatDistanceToNow(to, { addSuffix: true }))
    }, 1000)

    return () => clearInterval(interval)
  }, [to])

  return <span className="font-bold">{time}</span>
}

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
  const [metricsData, setMetricsData] = useState({
    onlineUsers: 0,
    bookedBooks: 0,
    totalAppointments: 0,
  });

  useEffect(() => {
    // Simulating fetching data or dynamic calculations
    setMetricsData({
      onlineUsers: Math.floor(Math.random() * users.length) + 1,
      bookedBooks: libraryBooks.filter(b => b.borrowedBy).length,
      totalAppointments: appointments.length,
    });
  }, []);


  const modules = useMemo(() => {
    return allNavItems.filter(item => displayedModules.includes(item.href) && item.href !== '/dashboard')
  }, [displayedModules])

  const metrics = useMemo(() => {
    return [
      {
        key: "online-users",
        icon: Users,
        label: "Online Users",
        value: metricsData.onlineUsers,
        description: "Users currently active",
        color: "bg-blue-100 dark:bg-blue-900/50",
        textColor: "text-blue-600 dark:text-blue-400"
      },
      {
        key: "booked-books",
        icon: Library,
        label: "Books Checked Out",
        value: metricsData.bookedBooks,
        description: "Books currently on loan",
        color: "bg-green-100 dark:bg-green-900/50",
        textColor: "text-green-600 dark:text-green-400"
      },
      {
        key: "total-appointments",
        icon: CalendarDays,
        label: "Total Appointments",
        value: metricsData.totalAppointments,
        description: "Scheduled appointments",
        color: "bg-purple-100 dark:bg-purple-900/50",
        textColor: "text-purple-600 dark:text-purple-400"
      },
    ].filter(m => displayedMetrics.includes(m.key))
  }, [displayedMetrics, metricsData])

  const nextAppointments = useMemo(() => {
    const upcoming = appointments
      .filter(appt => isFuture(new Date(appt.date)))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (upcoming.length === 0) return [];
    
    const nextApptTime = upcoming[0].date;
    return upcoming.filter(appt => appt.date === nextApptTime);
  }, [appointments]);

  const canViewNextAppointment = currentUser.role === 'admin' || currentUser.role === 'faculty';


  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.key} className="flex flex-col">
            <CardHeader className="flex-grow">
               <div className="flex items-start justify-between">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </CardTitle>
                  <div className="text-3xl font-bold">{metric.value}</div>
                </div>
                <div className={`flex items-center justify-center rounded-lg p-3 ${metric.color}`}>
                  <metric.icon className={`h-6 w-6 ${metric.textColor}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}

        {canViewNextAppointment && (
          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
             <CardHeader>
               <div className="flex items-start justify-between">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Next Appointment
                  </CardTitle>
                  <div className="text-2xl">
                    {nextAppointments.length > 0 ? <Countdown to={new Date(nextAppointments[0].date)} /> : "No upcoming appointments"}
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-lg p-3 bg-amber-100 dark:bg-amber-900/50">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {nextAppointments.length > 0 ? (
                <div className="space-y-2 text-sm">
                   {nextAppointments.map(appt => {
                     const student = users.find(u => u.id === appt.studentId);
                     const advisor = users.find(u => u.id === appt.advisorId);
                     return (
                        <div key={appt.id} className="flex justify-between items-center text-muted-foreground">
                          <span>{student?.name} with {advisor?.name}</span>
                        </div>
                     )
                   })}
                </div>
              ) : (
                 <p className="text-xs text-muted-foreground">
                    Your schedule is clear.
                  </p>
              )}
            </CardContent>
          </Card>
        )}
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

