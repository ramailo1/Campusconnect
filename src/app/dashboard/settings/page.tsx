
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { navItems as defaultNavItems, adminNavItems as defaultAdminNavItems } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
    const { toast } = useToast()
    const [navItems, setNavItems] = useState(defaultNavItems)
    const [adminNavItems, setAdminNavItems] = useState(defaultAdminNavItems)

    const handleNavItemChange = (index: number, newLabel: string) => {
        const newItems = [...navItems]
        newItems[index] = { ...newItems[index], label: newLabel }
        setNavItems(newItems)
    }

    const handleAdminNavItemChange = (index: number, newLabel: string) => {
        const newItems = [...adminNavItems]
        newItems[index] = { ...newItems[index], label: newLabel }
        setAdminNavItems(newItems)
    }

    const handleSaveChanges = () => {
        // In a real application, you would save these settings to a database.
        console.log("Saving new nav items:", navItems)
        console.log("Saving new admin nav items:", adminNavItems)
        toast({
            title: "Settings Saved",
            description: "Menu item labels have been updated. (This is a simulation)",
        })
    }


    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Manage system-wide settings like navigation menu items.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Navigation Menu</CardTitle>
                            <CardDescription>Rename the labels for the main and admin navigation items.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                             <div className="grid gap-4">
                                <h3 className="text-lg font-medium">Main Menu</h3>
                                {navItems.map((item, index) => (
                                    <div key={item.href} className="grid gap-2">
                                        <Label htmlFor={`nav-item-${index}`}>{item.label} (Original)</Label>
                                        <Input
                                            id={`nav-item-${index}`}
                                            value={item.label}
                                            onChange={(e) => handleNavItemChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="grid gap-4">
                                <h3 className="text-lg font-medium">Admin Menu</h3>
                                {adminNavItems.map((item, index) => (
                                     <div key={item.href} className="grid gap-2">
                                        <Label htmlFor={`admin-nav-item-${index}`}>{item.label} (Original)</Label>
                                         <Input
                                            id={`admin-nav-item-${index}`}
                                            value={item.label}
                                            onChange={(e) => handleAdminNavItemChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    )
}
