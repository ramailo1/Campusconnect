
"use client"

import { useState, useMemo, useEffect } from "react"
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
import {
    appointments as allAppointments,
    users,
    currentUser,
    availabilitySlots as allAvailabilitySlots
} from "@/lib/data"
import type { Appointment, AvailabilitySlot, User } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format, parse, startOfDay, addMinutes } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { defaultRoles } from "@/lib/roles"

const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
];

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>(allAppointments)
    const [availability, setAvailability] = useState<AvailabilitySlot[]>(allAvailabilitySlots)
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [appointmentFormText, setAppointmentFormText] = useState({
        title: "Schedule an Appointment",
        description: "Book a new appointment.",
        studentLabel: "Student",
        studentPlaceholder: "Select a student",
        advisorLabel: "Advisor",
        advisorPlaceholder: "Select an advisor",
        dateLabel: "Date",
        timeLabel: "Available Times",
        timePlaceholder: "Select a time slot",
        notesLabel: "Notes (Optional)",
        notesPlaceholder: "e.g. Discussing fall semester schedule",
        buttonText: "Schedule Appointment"
    })

    useEffect(() => {
        const savedText = localStorage.getItem("appointmentFormText");
        if (savedText) {
            setAppointmentFormText(JSON.parse(savedText));
        }
    }, []);

    const currentUserRole = defaultRoles.find(role => role.id === currentUser.role)
    const canManageAvailability = currentUserRole?.permissions.includes('manage-availability')

    const displayedAppointments = (currentUser.role === 'admin' || currentUser.role === 'faculty')
        ? appointments.filter(appt => appt.advisorId === currentUser.id)
        : appointments.filter(appt => appt.studentId === currentUser.id)
    
    const myAvailability = useMemo(() => {
        if (!selectedDate) return []
        const dateStr = format(selectedDate, 'yyyy-MM-dd')
        return availability.filter(slot => slot.advisorId === currentUser.id && slot.date === dateStr)
    }, [availability, selectedDate, currentUser.id])

    const advisors = users.filter(u => u.role === 'faculty' || u.role === 'admin');
    const students = users.filter(u => u.role === 'student');

    // State for the new appointment form
    const [selectedStudentId, setSelectedStudentId] = useState<string>("");
    const [selectedAdvisorId, setSelectedAdvisorId] = useState<string>("");
    const [selectedBookingDate, setSelectedBookingDate] = useState<Date | undefined>();

    const availableBookingSlots = useMemo(() => {
        if (!selectedAdvisorId || !selectedBookingDate) return []
        const dateStr = format(selectedBookingDate, 'yyyy-MM-dd')

        const advisorAvailability = availability.filter(slot => slot.advisorId === selectedAdvisorId && slot.date === dateStr)
        const bookedAppointments = appointments.filter(appt => appt.advisorId === selectedAdvisorId && format(new Date(appt.date), 'yyyy-MM-dd') === dateStr)
        
        return advisorAvailability.filter(availSlot => 
            !bookedAppointments.some(bookedAppt => format(new Date(bookedAppt.date), 'HH:mm') === availSlot.time)
        )
    }, [selectedAdvisorId, selectedBookingDate, availability, appointments])


    const handleOpenEditDialog = (appointment: Appointment) => {
        setEditingAppointment(appointment)
    }

    const handleCloseEditDialog = () => {
        setEditingAppointment(null)
    }

    const handleUpdateAppointment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingAppointment) return;

        const formData = new FormData(e.currentTarget);
        const updatedAppointment: Appointment = {
            ...editingAppointment,
            studentId: formData.get("student-id") as string,
            advisorId: formData.get("advisor-id") as string,
            date: new Date(`${formData.get("date")}T${formData.get("time")}`).toISOString(),
            status: formData.get("status") as 'Confirmed' | 'Pending' | 'Canceled',
            notes: formData.get("notes") as string,
        };

        setAppointments(appointments.map(a => a.id === editingAppointment.id ? updatedAppointment : a));
        handleCloseEditDialog();
    }
    
    const handleCancelAppointment = (appointmentId: string) => {
        setAppointments(appointments.filter(a => a.id !== appointmentId));
    }

    const handleToggleAvailability = (time: string) => {
        if (!selectedDate) return;
        const dateStr = format(selectedDate, 'yyyy-MM-dd')
        const existingSlot = myAvailability.find(slot => slot.time === time)

        if (existingSlot) {
            // Remove availability
            setAvailability(availability.filter(slot => slot.id !== existingSlot.id))
        } else {
            // Add availability
            const newSlot: AvailabilitySlot = {
                id: `avail-${Date.now()}`,
                advisorId: currentUser.id,
                date: dateStr,
                time: time
            }
            setAvailability([...availability, newSlot])
        }
    }
    
    const handleScheduleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const time = formData.get('time') as string;
        const studentId = currentUser.role === 'admin' ? selectedStudentId : currentUser.id;
        
        if (!selectedAdvisorId || !selectedBookingDate || !time || !studentId) {
            // Basic validation
            return;
        }

        const date = startOfDay(selectedBookingDate);
        const [hours, minutes] = time.split(':').map(Number);
        const appointmentDateTime = addMinutes(addMinutes(date, minutes), hours * 60).toISOString();

        const newAppointment: Appointment = {
            id: `appt-${Date.now()}`,
            studentId: studentId,
            advisorId: selectedAdvisorId,
            date: appointmentDateTime,
            status: 'Confirmed',
            notes: formData.get('notes') as string,
        };
        setAppointments([newAppointment, ...appointments]);
        // Reset form
        setSelectedAdvisorId("");
        setSelectedStudentId("");
        setSelectedBookingDate(undefined);
    }
    
    const canScheduleAppointments = currentUser.role === 'student' || currentUser.role === 'admin';


    return (
        <>
            <Tabs defaultValue="appointments" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="appointments">My Appointments</TabsTrigger>
                    {canManageAvailability && <TabsTrigger value="availability">My Availability</TabsTrigger>}
                </TabsList>
                <TabsContent value="appointments">
                    <div className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-4 md:gap-8 lg:grid-cols-3">
                        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Appointments</CardTitle>
                                    <CardDescription>
                                        A list of your upcoming and past appointments.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>{currentUser.role === 'student' ? 'Advisor' : 'Student'}</TableHead>
                                                <TableHead>Date & Time</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Notes</TableHead>
                                                <TableHead><span className="sr-only">Actions</span></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {displayedAppointments.map(appt => {
                                                const student = users.find(u => u.id === appt.studentId)
                                                const advisor = users.find(u => u.id === appt.advisorId)
                                                return (
                                                <TableRow key={appt.id}>
                                                    <TableCell>{currentUser.role === 'student' ? advisor?.name : student?.name ?? 'Unknown'}</TableCell>
                                                    <TableCell>{format(new Date(appt.date), "PPP 'at' p")}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={appt.status === 'Confirmed' ? 'default' : appt.status === 'Canceled' ? 'destructive' : 'secondary'}>{appt.status}</Badge>
                                                    </TableCell>
                                                    <TableCell className="max-w-[200px] truncate">{appt.notes}</TableCell>
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
                                                            <DropdownMenuItem onClick={() => handleOpenEditDialog(appt)}>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleCancelAppointment(appt.id)}>Cancel</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            )})}
                                        </TableBody>
                                    </Table>
                                    {displayedAppointments.length === 0 && (
                                        <div className="text-center p-8 text-muted-foreground">No appointments to display.</div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                        {canScheduleAppointments && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{appointmentFormText.title}</CardTitle>
                                <CardDescription>
                                    {appointmentFormText.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleScheduleSubmit} className="grid gap-6">
                                     {currentUser.role === 'admin' && (
                                        <div className="grid gap-3">
                                            <Label htmlFor="student">{appointmentFormText.studentLabel}</Label>
                                            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={appointmentFormText.studentPlaceholder} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {students.map(student => (
                                                        <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    <div className="grid gap-3">
                                        <Label htmlFor="advisor">{appointmentFormText.advisorLabel}</Label>
                                        <Select value={selectedAdvisorId} onValueChange={setSelectedAdvisorId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={appointmentFormText.advisorPlaceholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {advisors.map(advisor => (
                                                    <SelectItem key={advisor.id} value={advisor.id}>{advisor.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="appointment-date">{appointmentFormText.dateLabel}</Label>
                                        <Input 
                                            id="appointment-date" 
                                            type="date"
                                            value={selectedBookingDate ? format(selectedBookingDate, 'yyyy-MM-dd') : ''}
                                            onChange={(e) => setSelectedBookingDate(e.target.value ? parse(e.target.value, 'yyyy-MM-dd', new Date()) : undefined)}
                                            min={format(new Date(), 'yyyy-MM-dd')}
                                        />
                                    </div>
                                    
                                    {selectedAdvisorId && selectedBookingDate && (
                                    <div className="grid gap-3">
                                        <Label htmlFor="appointment-time">{appointmentFormText.timeLabel}</Label>
                                        <Select name="time">
                                            <SelectTrigger>
                                                <SelectValue placeholder={appointmentFormText.timePlaceholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableBookingSlots.length > 0 ? (
                                                    availableBookingSlots.map(slot => (
                                                        <SelectItem key={slot.id} value={slot.time}>{slot.time}</SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="no-slots" disabled>No available slots</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    )}

                                    <div className="grid gap-3">
                                        <Label htmlFor="notes">{appointmentFormText.notesLabel}</Label>
                                        <Textarea
                                            id="notes"
                                            name="notes"
                                            placeholder={appointmentFormText.notesPlaceholder}
                                            className="min-h-24"
                                        />
                                    </div>
                                    <Button type="submit" className="w-fit">{appointmentFormText.buttonText}</Button>
                                </form>
                            </CardContent>
                        </Card>
                        )}
                    </div>
                </TabsContent>

                {canManageAvailability && (
                <TabsContent value="availability">
                   <Card>
                        <CardHeader>
                            <CardTitle>Manage Your Availability</CardTitle>
                            <CardDescription>Select a date to view and edit your available time slots for appointments.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-8">
                            <div>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="rounded-md border"
                                />
                            </div>
                            <div className="grid gap-4">
                                <h3 className="text-lg font-medium">
                                    Available Slots for {selectedDate ? format(selectedDate, 'PPP') : '...'}
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map(time => {
                                    const isAvailable = myAvailability.some(slot => slot.time === time)
                                    const isBooked = appointments.some(appt => 
                                        appt.advisorId === currentUser.id &&
                                        format(new Date(appt.date), 'yyyy-MM-dd') === (selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '') &&
                                        format(new Date(appt.date), 'HH:mm') === time
                                    )
                                    return (
                                        <Button 
                                            key={time}
                                            variant={isAvailable ? "default" : "outline"}
                                            onClick={() => handleToggleAvailability(time)}
                                            disabled={isBooked}
                                            className={isBooked ? "bg-destructive text-destructive-foreground hover:bg-destructive" : ""}
                                        >
                                            {isBooked ? "Booked" : time}
                                        </Button>
                                    )
                                })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                )}
            </Tabs>
            {editingAppointment && (
                <Dialog open={!!editingAppointment} onOpenChange={(isOpen) => !isOpen && handleCloseEditDialog()}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Appointment</DialogTitle>
                      <DialogDescription>
                        Update the details for the appointment.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateAppointment} className="grid gap-6 py-4">
                      <div className="grid gap-3">
                        <Label htmlFor="edit-student-id">Student</Label>
                        <Select name="student-id" defaultValue={editingAppointment.studentId}>
                          <SelectTrigger><SelectValue/></SelectTrigger>
                          <SelectContent>
                            {students.map(student => (
                              <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-advisor-id">Advisor</Label>
                        <Select name="advisor-id" defaultValue={editingAppointment.advisorId}>
                          <SelectTrigger><SelectValue/></SelectTrigger>
                          <SelectContent>
                            {advisors.map(advisor => (
                              <SelectItem key={advisor.id} value={advisor.id}>{advisor.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="edit-date">Date</Label>
                            <Input id="edit-date" name="date" type="date" defaultValue={format(new Date(editingAppointment.date), 'yyyy-MM-dd')} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="edit-time">Time</Label>
                            <Input id="edit-time" name="time" type="time" defaultValue={format(new Date(editingAppointment.date), 'HH:mm')} />
                        </div>
                       </div>
                       <div className="grid gap-3">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select name="status" defaultValue={editingAppointment.status}>
                          <SelectTrigger><SelectValue/></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Canceled">Canceled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-notes">Notes</Label>
                        <Textarea
                          id="edit-notes"
                          name="notes"
                          defaultValue={editingAppointment.notes}
                          className="min-h-24"
                        />
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleCloseEditDialog}>
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
        </>
    )
}

    