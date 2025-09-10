"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Manage your public profile and account information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://picsum.photos/seed/avatar1/100/100" />
                                <AvatarFallback>SA</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <Label>Profile Picture</Label>
                                <Input type="file" className="max-w-sm" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" defaultValue="Super" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" defaultValue="Admin" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="admin@campus.edu" />
                        </div>

                        <Button type="submit" className="w-fit">Update Profile</Button>
                    </form>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password here. It's a good idea to use a strong password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                        <Button type="submit" className="w-fit">Change Password</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
