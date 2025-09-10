import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CoursesPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Courses
        </h3>
        <p className="text-sm text-muted-foreground">
          This is where course management will be.
        </p>
      </div>
    </div>
  );
}
