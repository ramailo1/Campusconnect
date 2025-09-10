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

export default function AppointmentsPage() {
    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
                            <Input
                                id="student-name"
                                type="text"
                                placeholder="e.g. John Doe"
                            />
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
                                    <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                                    <SelectItem value="prof-jones">Professor Jones</SelectItem>
                                    <SelectItem value="ms-davis">Ms. Davis</SelectItem>
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
