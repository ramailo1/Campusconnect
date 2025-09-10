"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/dashboard/theme-toggle"

export default function SettingsPage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Manage your application settings.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="theme">Theme</Label>
                            <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
                        </div>
                        <div className="w-48">
                           <ThemeToggle />
                        </div>
                    </div>
                     <div className="flex items-center justify-between">
                        <div>
                            <Label htmlFor="language">Language</Label>
                            <p className="text-sm text-muted-foreground">Set the display language.</p>
                        </div>
                        <Select>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Control how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                     <div className="flex items-center space-x-2">
                        <Checkbox id="email-notifications" defaultChecked />
                        <label
                            htmlFor="email-notifications"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                           Email Notifications
                        </label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="push-notifications" />
                        <label
                            htmlFor="push-notifications"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                           Push Notifications
                        </label>
                    </div>
                </CardContent>
            </Card>
            <Button>Save Settings</Button>
        </div>
    )
}
