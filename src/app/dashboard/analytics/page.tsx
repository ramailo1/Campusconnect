
"use client"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Pie, PieChart, Cell, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Download, Users, BookOpen, Library, CalendarCheck } from "lucide-react"
import { users, courses, libraryBooks, appointments } from "@/lib/data"

const platformActivityData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const platformActivityConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

const userRolesData = [
    { role: 'Students', value: users.filter(u => u.role === 'student').length, fill: "hsl(var(--chart-1))" },
    { role: 'Faculty', value: users.filter(u => u.role === 'faculty').length, fill: "hsl(var(--chart-2))" },
    { role: 'Admins', value: users.filter(u => u.role === 'admin').length, fill: "hsl(var(--chart-3))" },
]

const courseEnrollmentData = courses.map(course => ({
    name: course.code,
    students: course.enrolledStudents.length
}))

const courseEnrollmentConfig = {
    students: {
        label: "Students",
        color: "hsl(var(--primary))",
    }
}


export default function AnalyticsPage() {
  const totalUsers = users.length
  const totalCourses = courses.length
  const totalBooksBorrowed = libraryBooks.filter(b => b.borrowedBy).length
  const totalAppointments = appointments.length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export PDF</Button>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalCourses}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Books Borrowed</CardTitle>
                    <Library className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalBooksBorrowed} / {libraryBooks.length}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalAppointments}</div>
                </CardContent>
            </Card>
       </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>Monthly active users on different platforms.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={platformActivityConfig} className="min-h-[300px] w-full">
              <LineChart data={platformActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={true} />
                <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={true} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Distribution of user roles across the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="min-h-[300px] w-full">
                    <PieChart>
                         <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={userRolesData} dataKey="value" nameKey="role" innerRadius={60} outerRadius={100} paddingAngle={5} >
                             {userRolesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

       <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Course Enrollment</CardTitle>
                <CardDescription>Number of students enrolled per course.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={courseEnrollmentConfig} className="min-h-[400px] w-full">
                    <BarChart data={courseEnrollmentData} layout="vertical" margin={{ left: 10 }}>
                        <CartesianGrid horizontal={false} />
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} />
                        <XAxis type="number" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="students" fill="var(--color-students)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
