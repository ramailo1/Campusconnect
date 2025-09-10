
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { navItems as defaultNavItems, adminNavItems as defaultAdminNavItems, iconMap } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { NavItem } from "@/lib/data"

export default function SettingsPage() {
    const { toast } = useToast()
    const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems)
    const [adminNavItems, setAdminNavItems] = useState<NavItem[]>(defaultAdminNavItems)

    const [newNavItem, setNewNavItem] = useState({ label: "", href: "", icon: Object.keys(iconMap)[0] })
    const [newAdminNavItem, setNewAdminNavItem] = useState({ label: "", href: "", icon: Object.keys(iconMap)[0] })


    const handleNavItemChange = (index: number, field: keyof NavItem, value: string) => {
        const newItems = [...navItems];
        (newItems[index] as any)[field] = value;
        setNavItems(newItems);
    };

    const handleAdminNavItemChange = (index: number, field: keyof NavItem, value: string) => {
        const newItems = [...adminNavItems];
        (newItems[index] as any)[field] = value;
        setAdminNavItems(newItems);
    };

    const handleAddNavItem = (isAdmin: boolean) => {
        const itemToAdd = isAdmin ? newAdminNavItem : newNavItem
        if (!itemToAdd.label || !itemToAdd.href) {
            toast({
                variant: "destructive",
                title: "Missing fields",
                description: "Please provide a label and a path for the new menu item.",
            })
            return
        }

        const newItem: NavItem = {
            ...itemToAdd,
            icon: iconMap[itemToAdd.icon as keyof typeof iconMap],
            href: itemToAdd.href.startsWith('/') ? itemToAdd.href : `/${itemToAdd.href}`
        }

        if (isAdmin) {
            setAdminNavItems([...adminNavItems, newItem])
            setNewAdminNavItem({ label: "", href: "", icon: Object.keys(iconMap)[0] })
        } else {
            setNavItems([...navItems, newItem])
            setNewNavItem({ label: "", href: "", icon: Object.keys(iconMap)[0] })
        }
    }

    const handleRemoveNavItem = (index: number, isAdmin: boolean) => {
        if (isAdmin) {
            setAdminNavItems(adminNavItems.filter((_, i) => i !== index))
        } else {
            setNavItems(navItems.filter((_, i) => i !== index))
        }
    }

    const handleSaveChanges = () => {
        console.log("Saving new nav items:", navItems)
        console.log("Saving new admin nav items:", adminNavItems)
        toast({
            title: "Settings Saved",
            description: "Menu items have been updated. (This is a simulation)",
        })
    }

    const iconOptions = Object.keys(iconMap).map(key => (
        <SelectItem key={key} value={key}>{key}</SelectItem>
    ))

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Manage system-wide settings like navigation menu items.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Main Menu</CardTitle>
                                <CardDescription>Add, remove, or rename the main navigation items.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {navItems.map((item, index) => (
                                    <div key={index} className="flex items-end gap-2">
                                        <div className="grid gap-2 flex-1">
                                            <Label htmlFor={`nav-item-label-${index}`}>Label</Label>
                                            <Input
                                                id={`nav-item-label-${index}`}
                                                value={item.label}
                                                onChange={(e) => handleNavItemChange(index, 'label', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2 flex-1">
                                             <Label htmlFor={`nav-item-path-${index}`}>Path</Label>
                                            <Input
                                                id={`nav-item-path-${index}`}
                                                value={item.href}
                                                onChange={(e) => handleNavItemChange(index, 'href', e.target.value)}
                                            />
                                        </div>
                                        <Button variant="outline" size="icon" onClick={() => handleRemoveNavItem(index, false)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <div className="border p-4 rounded-md mt-4 grid gap-4">
                                     <h4 className="text-md font-medium">Add New Item</h4>
                                     <div className="flex items-end gap-2">
                                        <div className="grid gap-2 flex-1">
                                            <Label htmlFor="new-nav-item-label">Label</Label>
                                            <Input id="new-nav-item-label" value={newNavItem.label} onChange={(e) => setNewNavItem({...newNavItem, label: e.target.value})} placeholder="New Item" />
                                        </div>
                                        <div className="grid gap-2 flex-1">
                                            <Label htmlFor="new-nav-item-path">Path</Label>
                                            <Input id="new-nav-item-path" value={newNavItem.href} onChange={(e) => setNewNavItem({...newNavItem, href: e.target.value})} placeholder="/new-path"/>
                                        </div>
                                     </div>
                                     <div className="grid gap-2">
                                        <Label htmlFor="new-nav-item-icon">Icon</Label>
                                        <Select value={newNavItem.icon} onValueChange={(value) => setNewNavItem({...newNavItem, icon: value})}>
                                            <SelectTrigger id="new-nav-item-icon"><SelectValue /></SelectTrigger>
                                            <SelectContent>{iconOptions}</SelectContent>
                                        </Select>
                                     </div>
                                     <Button onClick={() => handleAddNavItem(false)} className="w-fit"><PlusCircle className="mr-2"/> Add Item</Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Admin Menu</CardTitle>
                                <CardDescription>Add, remove, or rename the admin navigation items.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {adminNavItems.map((item, index) => (
                                     <div key={index} className="flex items-end gap-2">
                                         <div className="grid gap-2 flex-1">
                                            <Label htmlFor={`admin-nav-item-label-${index}`}>Label</Label>
                                            <Input
                                                id={`admin-nav-item-label-${index}`}
                                                value={item.label}
                                                onChange={(e) => handleAdminNavItemChange(index, 'label', e.target.value)}
                                            />
                                         </div>
                                        <div className="grid gap-2 flex-1">
                                            <Label htmlFor={`admin-nav-item-path-${index}`}>Path</Label>
                                            <Input
                                                id={`admin-nav-item-path-${index}`}
                                                value={item.href}
                                                onChange={(e) => handleAdminNavItemChange(index, 'href', e.target.value)}
                                            />
                                        </div>
                                        <Button variant="outline" size="icon" onClick={() => handleRemoveNavItem(index, true)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <div className="border p-4 rounded-md mt-4 grid gap-4">
                                     <h4 className="text-md font-medium">Add New Item</h4>
                                     <div className="flex items-end gap-2">
                                        <div className="grid gap-2 flex-1">
                                            <Label htmlFor="new-admin-nav-item-label">Label</Label>
                                            <Input id="new-admin-nav-item-label" value={newAdminNavItem.label} onChange={(e) => setNewAdminNavItem({...newAdminNavItem, label: e.target.value})} placeholder="New Item" />
                                        </div>
                                        <div className="grid gap-2 flex-1">
                                            <Label htmlFor="new-admin-nav-item-path">Path</Label>
                                            <Input id="new-admin-nav-item-path" value={newAdminNavItem.href} onChange={(e) => setNewAdminNavItem({...newAdminNavItem, href: e.target.value})} placeholder="/new-path"/>
                                        </div>
                                     </div>
                                     <div className="grid gap-2">
                                        <Label htmlFor="new-admin-nav-item-icon">Icon</Label>
                                        <Select value={newAdminNavItem.icon} onValueChange={(value) => setNewAdminNavItem({...newAdminNavItem, icon: value})}>
                                            <SelectTrigger id="new-admin-nav-item-icon"><SelectValue /></SelectTrigger>
                                            <SelectContent>{iconOptions}</SelectContent>
                                        </Select>
                                     </div>
                                     <Button onClick={() => handleAddNavItem(true)} className="w-fit"><PlusCircle className="mr-2"/> Add Item</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    )
}
