
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
import { Textarea } from "@/components/ui/textarea"
import { courses as allCourses, currentUser } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import type { Course } from "@/lib/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"


export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(allCourses)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  
  const isStudent = currentUser.role === 'student'
  const isFaculty = currentUser.role === 'faculty'
  const isAdmin = currentUser.role === 'admin'

  const handleEnroll = (courseCode: string) => {
    setCourses(currentCourses =>
      currentCourses.map(course => {
        if (course.code === courseCode) {
          const isEnrolled = course.enrolledStudents.includes(currentUser.id)
          if (isEnrolled) {
            // Disenroll
            return { ...course, enrolledStudents: course.enrolledStudents.filter(id => id !== currentUser.id) }
          } else {
            // Enroll
            return { ...course, enrolledStudents: [...course.enrolledStudents, currentUser.id] }
          }
        }
        return course
      })
    )
  }

  const handleOpenEditDialog = (course: Course) => {
    setEditingCourse(course)
  }

  const handleCloseEditDialog = () => {
    setEditingCourse(null)
  }

  const handleUpdateCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCourse) return;

    const formData = new FormData(e.currentTarget);
    const updatedCourse: Course = {
      ...editingCourse,
      name: formData.get("course-name") as string,
      code: formData.get("course-code") as string,
      description: formData.get("description") as string,
    };

    setCourses(courses.map(c => c.code === editingCourse.code ? updatedCourse : c));
    handleCloseEditDialog();
  }
  
  const handleDeleteCourse = (courseCode: string) => {
    setCourses(courses.filter(c => c.code !== courseCode));
  }

  const displayedCourses = isFaculty
    ? courses.filter(course => course.instructor === currentUser.name)
    : courses


  return (
    <>
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{isStudent ? "Course Catalog" : "My Courses"}</CardTitle>
            <CardDescription>
              {isStudent 
                ? "Browse and enroll in available courses."
                : "A list of courses you are teaching or managing."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead className="hidden md:table-cell">Instructor</TableHead>
                   {isStudent && <TableHead>Status</TableHead>}
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedCourses.map(course => {
                  const isEnrolled = isStudent && course.enrolledStudents.includes(currentUser.id)
                  return (
                    <TableRow key={course.code}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{course.code}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{course.instructor}</TableCell>
                      {isStudent && (
                        <TableCell>
                          {isEnrolled ? (
                            <Badge variant="default">Enrolled</Badge>
                          ) : (
                            <Badge variant="secondary">Not Enrolled</Badge>
                          )}
                        </TableCell>
                      )}
                      <TableCell>
                        {isStudent ? (
                          <Button 
                            variant={isEnrolled ? "outline" : "default"} 
                            size="sm"
                            onClick={() => handleEnroll(course.code)}
                          >
                            {isEnrolled ? "Disenroll" : "Enroll"}
                          </Button>
                        ) : (
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                              </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleOpenEditDialog(course)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteCourse(course.code)}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {(isAdmin || isFaculty) && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
            <CardDescription>
              Fill out the form below to add a new course to the catalog.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="course-name">Course Name</Label>
                <Input
                  id="course-name"
                  type="text"
                  className="w-full"
                  placeholder="e.g. Introduction to Computer Science"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="course-code">Course Code</Label>
                <Input
                  id="course-code"
                  type="text"
                  className="w-full"
                  placeholder="e.g. CS101"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A comprehensive introduction to the fundamental concepts of computer science..."
                  className="min-h-32"
                />
              </div>
              <Button type="submit" className="w-fit">Save Course</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
     {editingCourse && (
        <Dialog open={!!editingCourse} onOpenChange={(isOpen) => !isOpen && handleCloseEditDialog()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>
                Update the details for {editingCourse.name}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateCourse} className="grid gap-6 py-4">
              <div className="grid gap-3">
                <Label htmlFor="edit-course-name">Course Name</Label>
                <Input
                  id="edit-course-name"
                  name="course-name"
                  defaultValue={editingCourse.name}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="edit-course-code">Course Code</Label>
                <Input
                  id="edit-course-code"
                  name="course-code"
                  defaultValue={editingCourse.code}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={editingCourse.description}
                  className="min-h-32"
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
