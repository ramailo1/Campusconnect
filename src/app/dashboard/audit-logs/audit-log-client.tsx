'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Bot, Sparkles, Loader2 } from 'lucide-react';
import { summarizeLogs } from './actions';
import type { AuditLog } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';

type AuditLogClientProps = {
  logs: AuditLog[];
};

export function AuditLogClient({ logs }: AuditLogClientProps) {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [potentialIssues, setPotentialIssues] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    setIsSummaryOpen(true);
    setIsLoading(true);
    try {
      const logsString = JSON.stringify(logs, null, 2);
      const result = await summarizeLogs(logsString);
      setSummary(result.summary);
      setPotentialIssues(result.potentialIssues);
    } catch (error) {
      console.error(error);
      setSummary('Failed to generate summary.');
      setPotentialIssues('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="flex justify-end mb-4">
        <Button onClick={handleSummarize}>
          <Sparkles className="mr-2 h-4 w-4" />
          Summarize with AI
        </Button>
      </div>
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

      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6" /> AI-Powered Audit Log Summary
            </DialogTitle>
            <DialogDescription>
              An AI-generated summary of recent activities and potential issues.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-4 py-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Summary of Activities</h3>
                <p className="text-muted-foreground">{summary}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-destructive">
                  Potential Security Issues
                </h3>
                <p className="text-muted-foreground">{potentialIssues}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
