
"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, Library, BookCopy, UserCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { libraryBooks, users, currentUser } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useMemo, useState, useEffect } from "react"


export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [dashboardSettings, setDashboardSettings] = useState({
    metrics: ["total-visitors", "borrowed-books", "overdue-books", "new-members"],
    sections: ["users-list", "books-list", "top-choices"],
  });
  const [dashboardText, setDashboardText] = useState({
    greeting: "Hello",
    metrics: {
      "total-visitors": "Total Visitors",
      "borrowed-books": "Borrowed Books",
      "overdue-books": "Overdue Books",
      "new-members": "New Members",
    },
    sections: {
      "users-list": "Users List",
      "books-list": "Books List",
      "top-choices": "Top Choices",
    },
    addUserButton: "Add New User"
  });


  useEffect(() => {
    setCurrentDate(new Date());
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000) // Update every minute

    // In a real app, you'd fetch these settings. For now, we use localStorage for simulation.
    const savedSettings = localStorage.getItem("dashboardSettings")
    if (savedSettings) {
        setDashboardSettings(JSON.parse(savedSettings))
    }
    const savedText = localStorage.getItem("dashboardText")
    if (savedText) {
        setDashboardText(JSON.parse(savedText))
    }


    return () => clearInterval(timer)
  }, [])

  const metrics = useMemo(() => [
    {
      key: "total-visitors",
      icon: Users,
      label: dashboardText.metrics["total-visitors"],
      value: users.length,
    },
    {
      key: "borrowed-books",
      icon: Library,
      label: dashboardText.metrics["borrowed-books"],
      value: libraryBooks.filter(b => b.borrowedBy).length,
    },
    {
      key: "overdue-books",
      icon: BookCopy,
      label: dashboardText.metrics["overdue-books"],
      value: 3, // Dummy data
    },
    {
      key: "new-members",
      icon: UserCheck,
      label: dashboardText.metrics["new-members"],
      value: 2, // Dummy data
    },
  ], [dashboardText.metrics]);

  const displayedMetrics = metrics.filter(m => dashboardSettings.metrics.includes(m.key))
  const topChoices = useMemo(() => libraryBooks.slice(0, 4), []);
  const recentUsers = useMemo(() => users.slice(0, 5), []);
  const recentBooks = useMemo(() => libraryBooks.slice(0, 5), []);


  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{dashboardText.greeting}, {currentUser.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">
            {currentDate ? format(currentDate, "EEEE, MMMM d, yyyy | h:mm a") : '...'}
        </p>
      </div>
      
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {displayedMetrics.map((metric) => (
          <Card key={metric.key} className="flex items-center p-4">
            <div className="flex-grow">
                <div className="text-4xl font-bold">{metric.value}</div>
                <p className="text-sm text-muted-foreground">
                    {metric.label}
                </p>
            </div>
            <div className="flex items-center justify-center rounded-lg p-3 bg-primary/10">
                <metric.icon className="h-6 w-6 text-primary" />
            </div>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 mt-8">
        {dashboardSettings.sections.includes("users-list") && (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{dashboardText.sections["users-list"]}</CardTitle>
                <Button>{dashboardText.addUserButton}</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentUsers.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={`https://picsum.photos/seed/${user.id}/40/40`} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell><Badge variant="secondary">{user.role}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        )}
        {dashboardSettings.sections.includes("books-list") && (
        <Card>
            <CardHeader>
                <CardTitle>{dashboardText.sections["books-list"]}</CardTitle>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Book ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentBooks.map(book => (
                             <TableRow key={book.id}>
                                <TableCell className="font-mono text-muted-foreground">{book.id.substring(0, 10)}...</TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        )}
      </div>

       {dashboardSettings.sections.includes("top-choices") && (
       <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{dashboardText.sections["top-choices"]}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {topChoices.map(book => (
                <Card key={book.id} className="overflow-hidden">
                    <Image src={book.coverImage} alt={book.title} width={400} height={600} className="aspect-[2/3] object-cover w-full" />
                    <CardHeader>
                        <CardTitle className="text-base truncate">{book.title}</CardTitle>
                        <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
            </div>
       </div>
       )}
    </>
  )
}
