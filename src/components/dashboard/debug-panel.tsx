import { Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function DebugPanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Bug className="h-4 w-4" />
          <span className="sr-only">Open Debug Panel</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Debug Panel</SheetTitle>
          <SheetDescription>
            This panel shows recent system logs and errors.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <pre className="mt-2 h-[400px] w-full overflow-auto rounded-md bg-muted p-4 font-mono text-xs">
            <code>
              [ERROR] 2024-05-21T10:00:00Z: Failed to connect to database.
              <br />
              [WARN] 2024-05-21T10:01:15Z: API endpoint /api/v1/users is deprecated.
              <br />
              [INFO] 2024-05-21T10:02:30Z: User 'admin' logged in successfully.
              <br />
              [ERROR] 2024-05-21T10:05:00Z: Uncaught TypeError: Cannot read properties of undefined.
            </code>
          </pre>
        </div>
      </SheetContent>
    </Sheet>
  )
}
