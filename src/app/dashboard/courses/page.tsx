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

export default function CoursesPage() {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
    </div>
  )
}
