import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen, Calendar, FileText, Activity } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const modules = [
  {
    title: "My Courses",
    description: "Access your enrolled courses, materials, and grades.",
    icon: BookOpen,
    href: "/dashboard/courses",
    image: "https://picsum.photos/seed/course1/600/400",
    imageHint: "abstract geometry"
  },
  {
    title: "Appointments",
    description: "Schedule and manage appointments with advisors and faculty.",
    icon: Calendar,
    href: "/dashboard/appointments",
    image: "https://picsum.photos/seed/course2/600/400",
    imageHint: "modern library"
  },
  {
    title: "Library",
    description: "Search the digital library, reserve books, and access journals.",
    icon: FileText,
    href: "/dashboard/library",
    image: "https://picsum.photos/seed/course3/600/400",
    imageHint: "students collaborating"
  },
]

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.title}>
            <CardHeader className="p-0 overflow-hidden rounded-t-lg">
              <Image src={module.image} alt={module.title} width={600} height={400} className="aspect-video object-cover" data-ai-hint={module.imageHint} />
            </CardHeader>
            <CardHeader>
              <div className="flex items-center gap-4">
                <module.icon className="h-8 w-8 text-primary" />
                <CardTitle>{module.title}</CardTitle>
              </div>
              <CardDescription className="mt-2">{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={module.href}>
                <Button className="w-full">
                  Go to {module.title}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
