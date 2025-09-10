
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
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const metrics = useMemo(() => [
    {
      key: "total-visitors",
      icon: Users,
      label: "Total Visitors",
      value: users.length,
      color: "bg-sky-100 dark:bg-sky-900/50",
      textColor: "text-sky-600 dark:text-sky-400"
    },
    {
      key: "borrowed-books",
      icon: Library,
      label: "Borrowed Books",
      value: libraryBooks.filter(b => b.borrowedBy).length,
      color: "bg-rose-100 dark:bg-rose-900/50",
      textColor: "text-rose-600 dark:text-rose-400"
    },
    {
      key: "overdue-books",
      icon: BookCopy,
      label: "Overdue Books",
      value: 3, // Dummy data
      color: "bg-amber-100 dark:bg-amber-900/50",
      textColor: "text-amber-600 dark:text-amber-400"
    },
    {
      key: "new-members",
      icon: UserCheck,
      label: "New Members",
      value: 2, // Dummy data
      color: "bg-emerald-100 dark:bg-emerald-900/50",
      textColor: "text-emerald-600 dark:text-emerald-400"
    },
  ], []);

  const topChoices = useMemo(() => libraryBooks.slice(0, 4), []);
  const recentUsers = useMemo(() => users.slice(0, 5), []);
  const recentBooks = useMemo(() => libraryBooks.slice(0, 5), []);


  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Hello, {currentUser.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">{format(currentDate, "EEEE, MMMM d, yyyy | h:mm a")}</p>
      </div>
      
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {metrics.map((metric) => (
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
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Users List</CardTitle>
                <Button>Add New User</Button>
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
        <Card>
            <CardHeader>
                <CardTitle>Books List</CardTitle>
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
      </div>

       <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Top Choices</h2>
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
    </>
  )
}
