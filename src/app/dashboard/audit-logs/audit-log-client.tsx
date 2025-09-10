'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { AuditLog } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';

type AuditLogClientProps = {
  logs: AuditLog[];
};

export function AuditLogClient({ logs }: AuditLogClientProps) {
  const getBadgeVariant = (level: AuditLog['level']) => {
    switch (level) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={log.avatar} />
                      <AvatarFallback>
                        {log.user.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell className="text-muted-foreground">
                  {log.details}
                </TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(log.level)}>{log.level}</Badge>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(log.timestamp), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
