"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { appointments as allAppointments, users, currentUser } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"


export default function AppointmentsPage() {
    const isAdmin = currentUser.role === 'admin'
    const appointments = isAdmin 
        ? allAppointments
        : allAppointments.filter(appt => appt.advisorId === currentUser.id || appt.studentId === currentUser.id)

    const advisors = users.filter(u => u.role === 'faculty' || u.role === 'admin');
    const students = users.filter(u => u.role === 'student');


    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>My Appointments</CardTitle>
                        <CardDescription>
                            A list of your upcoming and past appointments.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Advisor</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map(appt => {
                                    const student = users.find(u => u.id === appt.studentId)
                                    const advisor = users.find(u => u.id === appt.advisorId)
                                    return (
                                    <TableRow key={appt.id}>
                                        <TableCell>{student?.name ?? 'Unknown'}</TableCell>
                                        <TableCell>{advisor?.name ?? 'Unknown'}</TableCell>
                                        <TableCell>{format(new Date(appt.date), "PPP 'at' p")}</TableCell>
                                        <TableCell>
                                            <Badge variant={appt.status === 'Confirmed' ? 'default' : 'secondary'}>{appt.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                                <DropdownMenuItem>Cancel</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Schedule a New Appointment</CardTitle>
                    <CardDescription>
                        Fill out the form to schedule a new appointment.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="student-name">Student Name</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a student" />
                                </SelectTrigger>
                                <SelectContent>
                                    {students.map(student => (
                                        <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="appointment-date">Date</Label>
                                <Input id="appointment-date" type="date" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="appointment-time">Time</Label>
                                <Input id="appointment-time" type="time" />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="advisor">Advisor</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an advisor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {advisors.map(advisor => (
                                         <SelectItem key={advisor.id} value={advisor.id}>{advisor.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                placeholder="e.g. Discussing fall semester schedule"
                                className="min-h-24"
                            />
                        </div>
                        <Button type="submit" className="w-fit">Schedule Appointment</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
