
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import type { NavItem } from "@/lib/data"
import { defaultRoles, permissionLabels } from "@/lib/roles"
import type { Role, Permission } from "@/lib/roles"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function SettingsPage() {
    const { toast } = useToast()
    const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems)
    const [adminNavItems, setAdminNavItems] = useState<NavItem[]>(defaultAdminNavItems)
    const [roles, setRoles] = useState<Role[]>(defaultRoles)
    const [newRoleName, setNewRoleName] = useState("")

    const [newNavItem, setNewNavItem] = useState({ label: "", href: "", icon: Object.keys(iconMap)[0], image: "https://picsum.photos/seed/new-item/600/400" })
    const [newAdminNavItem, setNewAdminNavItem] = useState({ label: "", href: "", icon: Object.keys(iconMap)[0] })
    
    const [courseFormText, setCourseFormText] = useState({
        title: "Add New Course",
        description: "Fill out the form below to add a new course to the catalog.",
        nameLabel: "Course Name",
        namePlaceholder: "e.g. Introduction to Computer Science",
        codeLabel: "Course Code",
        codePlaceholder: "e.g. CS101",
        descriptionLabel: "Description",
        descriptionPlaceholder: "A comprehensive introduction to the fundamental concepts of computer science...",
        buttonText: "Save Course"
    });
    
    const [bookFormText, setBookFormText] = useState({
        title: "Add New Book",
        description: "Add a new book to the library catalog.",
        titleLabel: "Title",
        titlePlaceholder: "Book Title",
        authorLabel: "Author",
        authorPlaceholder: "Author Name",
        coverImageLabel: "Cover Image URL",
        coverImagePlaceholder: "https://...",
        buttonText: "Add Book"
    });

    const [dashboardSettings, setDashboardSettings] = useState({
        metrics: ["total-visitors", "borrowed-books", "overdue-books", "new-members"],
        sections: ["users-list", "books-list", "top-choices"],
    })


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
            setNavItems([...navItems, newItem as NavItem])
            setNewNavItem({ label: "", href: "", icon: Object.keys(iconMap)[0], image: "https://picsum.photos/seed/new-item/600/400" })
        }
    }

    const handleRemoveNavItem = (index: number, isAdmin: boolean) => {
        if (isAdmin) {
            setAdminNavItems(adminNavItems.filter((_, i) => i !== index))
        } else {
            setNavItems(navItems.filter((_, i) => i !== index))
        }
    }

    const handleRoleNameChange = (index: number, newName: string) => {
        const newRoles = [...roles]
        newRoles[index].name = newName
        setRoles(newRoles)
    }

    const handlePermissionChange = (roleIndex: number, permission: Permission, checked: boolean) => {
        const newRoles = [...roles]
        const currentPermissions = newRoles[roleIndex].permissions
        if (checked) {
            newRoles[roleIndex].permissions = [...currentPermissions, permission]
        } else {
            newRoles[roleIndex].permissions = currentPermissions.filter(p => p !== permission)
        }
        setRoles(newRoles)
    }
    
    const handleAddRole = () => {
        if (!newRoleName.trim()) {
            toast({ variant: "destructive", title: "Role name cannot be empty." })
            return
        }
        const newRole: Role = {
            id: newRoleName.toLowerCase().replace(/\s+/g, '-'),
            name: newRoleName,
            permissions: []
        }
        setRoles([...roles, newRole])
        setNewRoleName("")
    }

    const handleRemoveRole = (index: number) => {
        setRoles(roles.filter((_, i) => i !== index))
    }
    
    const handleDashboardSectionChange = (section: string, checked: boolean) => {
        setDashboardSettings(prev => ({
            ...prev,
            sections: checked ? [...prev.sections, section] : prev.sections.filter(m => m !== section)
        }))
    }
    
    const handleDashboardMetricChange = (key: string, checked: boolean) => {
        setDashboardSettings(prev => ({
            ...prev,
            metrics: checked ? [...prev.metrics, key] : prev.metrics.filter(m => m !== key)
        }))
    }

    const handleSaveChanges = () => {
        console.log("Saving new nav items:", navItems)
        console.log("Saving new admin nav items:", adminNavItems)
        console.log("Saving new roles:", roles)
        console.log("Saving dashboard settings:", dashboardSettings)
        
        // This is a mock save. In a real app, you'd save this to a database or a file.
        localStorage.setItem("dashboardSettings", JSON.stringify(dashboardSettings))

        toast({
            title: "Settings Saved",
            description: "Your changes have been updated. (This is a simulation)",
        })
    }

    const iconOptions = Object.keys(iconMap).map(key => (
        <SelectItem key={key} value={key}>{key}</SelectItem>
    ))
    
    const allPermissions = Object.keys(permissionLabels) as Permission[]
    
    const dashboardMetricsOptions = [
        { key: "total-visitors", label: "Total Visitors" },
        { key: "borrowed-books", label: "Borrowed Books" },
        { key: "overdue-books", label: "Overdue Books" },
        { key: "new-members", label: "New Members" },
    ]
    
    const dashboardSectionsOptions = [
        { key: "users-list", label: "Users List Card" },
        { key: "books-list", label: "Books List Card" },
        { key: "top-choices", label: "Top Choices Section" },
    ]

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Manage system-wide settings like navigation, roles, and UI text.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="navigation" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="navigation">Navigation</TabsTrigger>
                            <TabsTrigger value="roles">Roles &amp; Permissions</TabsTrigger>
                            <TabsTrigger value="ui-customization">UI Customization</TabsTrigger>
                            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="navigation" className="pt-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Main Menu</CardTitle>
                                        <CardDescription>Add, remove, or rename the main navigation items.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        {navItems.map((item, index) => (
                                            <div key={index} className="flex flex-col gap-2 p-4 border rounded-md">
                                                <div className="flex items-end gap-2">
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
                                                 <div className="grid gap-2">
                                                    <Label htmlFor={`nav-item-image-${index}`}>Dashboard Image URL</Label>
                                                    <Input
                                                        id={`nav-item-image-${index}`}
                                                        value={item.image}
                                                        onChange={(e) => handleNavItemChange(index, 'image', e.target.value)}
                                                    />
                                                </div>
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
                                                <Label htmlFor="new-nav-item-image">Dashboard Image URL</Label>
                                                <Input id="new-nav-item-image" value={newNavItem.image} onChange={(e) => setNewNavItem({...newNavItem, image: e.target.value})} />
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
                        </TabsContent>
                        
                        <TabsContent value="roles" className="pt-6">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Role Management</CardTitle>
                                    <CardDescription>Define user roles and their permissions.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <Accordion type="single" collapsible className="w-full">
                                        {roles.map((role, roleIndex) => (
                                            <AccordionItem value={role.id} key={role.id}>
                                                <AccordionTrigger>
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <Input value={role.name} onChange={(e) => handleRoleNameChange(roleIndex, e.target.value)} className="font-semibold text-lg" />
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4">
                                                    <h4 className="font-medium mb-4">Permissions</h4>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        {allPermissions.map(permission => (
                                                            <div key={permission} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`${role.id}-${permission}`}
                                                                    checked={role.permissions.includes(permission)}
                                                                    onCheckedChange={(checked) => handlePermissionChange(roleIndex, permission, !!checked)}
                                                                />
                                                                <Label htmlFor={`${role.id}-${permission}`} className="font-normal">
                                                                    {permissionLabels[permission]}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <Button variant="destructive" size="sm" onClick={() => handleRemoveRole(roleIndex)} className="mt-6">
                                                        <Trash2 className="mr-2" /> Remove Role
                                                    </Button>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                    <div className="border p-4 rounded-md mt-4 grid gap-4">
                                        <h4 className="text-md font-medium">Add New Role</h4>
                                        <div className="flex items-center gap-2">
                                            <Input 
                                                value={newRoleName}
                                                onChange={(e) => setNewRoleName(e.target.value)}
                                                placeholder="Enter new role name"
                                            />
                                            <Button onClick={handleAddRole}>
                                                <PlusCircle className="mr-2"/> Add Role
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="ui-customization" className="pt-6">
                             <Card>
                                <CardHeader>
                                    <CardTitle>UI Text Customization</CardTitle>
                                    <CardDescription>Customize labels and placeholders for forms.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <Accordion type="multiple" className="w-full">
                                        <AccordionItem value="add-course-form">
                                            <AccordionTrigger>Add New Course Form</AccordionTrigger>
                                            <AccordionContent className="p-4 grid gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="course-title">Form Title</Label>
                                                    <Input id="course-title" value={courseFormText.title} onChange={(e) => setCourseFormText({...courseFormText, title: e.target.value})} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="course-description">Form Description</Label>
                                                    <Input id="course-description" value={courseFormText.description} onChange={(e) => setCourseFormText({...courseFormText, description: e.target.value})} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label>Name Label</Label>
                                                        <Input value={courseFormText.nameLabel} onChange={(e) => setCourseFormText({...courseFormText, nameLabel: e.target.value})} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Name Placeholder</Label>
                                                        <Input value={courseFormText.namePlaceholder} onChange={(e) => setCourseFormText({...courseFormText, namePlaceholder: e.target.value})} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Code Label</Label>
                                                        <Input value={courseFormText.codeLabel} onChange={(e) => setCourseFormText({...courseFormText, codeLabel: e.target.value})} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Code Placeholder</Label>
                                                        <Input value={courseFormText.codePlaceholder} onChange={(e) => setCourseFormText({...courseFormText, codePlaceholder: e.target.value})} />
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Description Label</Label>
                                                    <Input value={courseFormText.descriptionLabel} onChange={(e) => setCourseFormText({...courseFormText, descriptionLabel: e.target.value})} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Description Placeholder</Label>
                                                    <Textarea value={courseFormText.descriptionPlaceholder} onChange={(e) => setCourseFormText({...courseFormText, descriptionPlaceholder: e.target.value})} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Button Text</Label>
                                                    <Input value={courseFormText.buttonText} onChange={(e) => setCourseFormText({...courseFormText, buttonText: e.target.value})} />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="add-book-form">
                                            <AccordionTrigger>Add New Book Form</AccordionTrigger>
                                            <AccordionContent className="p-4 grid gap-4">
                                                <div className="grid gap-2">
                                                    <Label>Form Title</Label>
                                                    <Input value={bookFormText.title} onChange={(e) => setBookFormText({...bookFormText, title: e.target.value})} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Form Description</Label>
                                                    <Input value={bookFormText.description} onChange={(e) => setBookFormText({...bookFormText, description: e.target.value})} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label>Title Label</Label>
                                                        <Input value={bookFormText.titleLabel} onChange={(e) => setBookFormText({...bookFormText, titleLabel: e.target.value})} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Title Placeholder</Label>
                                                        <Input value={bookFormText.titlePlaceholder} onChange={(e) => setBookFormText({...bookFormText, titlePlaceholder: e.target.value})} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Author Label</Label>
                                                        <Input value={bookFormText.authorLabel} onChange={(e) => setBookFormText({...bookFormText, authorLabel: e.target.value})} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Author Placeholder</Label>
                                                        <Input value={bookFormText.authorPlaceholder} onChange={(e) => setBookFormText({...bookFormText, authorPlaceholder: e.target.value})} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Cover Image Label</Label>
                                                        <Input value={bookFormText.coverImageLabel} onChange={(e) => setBookFormText({...bookFormText, coverImageLabel: e.target.value})} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Cover Image Placeholder</Label>
                                                        <Input value={bookFormText.coverImagePlaceholder} onChange={(e) => setBookFormText({...bookFormText, coverImagePlaceholder: e.target.value})} />
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label>Button Text</Label>
                                                    <Input value={bookFormText.buttonText} onChange={(e) => setBookFormText({...bookFormText, buttonText: e.target.value})} />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        
                        <TabsContent value="dashboard" className="pt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Dashboard Layout</CardTitle>
                                    <CardDescription>Choose which sections and metrics to display on the main dashboard.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6 md:grid-cols-2">
                                    <div className="grid gap-4">
                                        <h4 className="font-medium">Dashboard Sections</h4>
                                        <div className="space-y-2">
                                            {dashboardSectionsOptions.map(section => (
                                                <div key={section.key} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`section-${section.key}`}
                                                        checked={dashboardSettings.sections.includes(section.key)}
                                                        onCheckedChange={(checked) => handleDashboardSectionChange(section.key, !!checked)}
                                                    />
                                                    <Label htmlFor={`section-${section.key}`} className="font-normal">
                                                        Display "{section.label}"
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid gap-4">
                                        <h4 className="font-medium">Key Metrics</h4>
                                        <div className="space-y-2">
                                             {dashboardMetricsOptions.map(metric => (
                                                <div key={metric.key} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`metric-${metric.key}`}
                                                        checked={dashboardSettings.metrics.includes(metric.key)}
                                                        onCheckedChange={(checked) => handleDashboardMetricChange(metric.key, !!checked)}
                                                    />
                                                    <Label htmlFor={`metric-${metric.key}`} className="font-normal">
                                                        {metric.label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>
            <Button onClick={handleSaveChanges} size="lg" className="w-fit">Save All Settings</Button>
        </div>
    )

    