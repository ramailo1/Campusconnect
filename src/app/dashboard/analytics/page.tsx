"use client"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

const moduleUsageData = [
    { name: 'Courses', usage: 4000 },
    { name: 'Library', usage: 3000 },
    { name: 'Appointments', usage: 2000 },
    { name: 'Profile', usage: 2780 },
    { name: 'Settings', usage: 1890 },
];
const moduleUsageConfig = {
    usage: {
        label: "Usage",
        color: "hsl(var(--primary))",
    }
}

export default function AnalyticsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics Dashboard</h1>
        <div className="flex gap-2">
            <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export PDF</Button>
            <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export CSV</Button>
        </div>
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>Monthly active users on different platforms.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Module Usage</CardTitle>
            <CardDescription>Usage statistics for different modules.</CardDescription>
          </CardHeader>
          <CardContent>
              <ChartContainer config={moduleUsageConfig} className="min-h-[300px] w-full">
                 <BarChart data={moduleUsageData} accessibilityLayer>
                   <CartesianGrid vertical={false} />
                   <XAxis dataKey="name" tickLine={false} tickMargin={10} angle={-45} textAnchor="end" />
                   <YAxis />
                   <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                   <Bar dataKey="usage" fill="var(--color-usage)" radius={8} />
                 </BarChart>
              </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
