'use server';
import { summarizeAuditLogs } from '@/ai/flows/summarize-audit-logs';

export async function summarizeLogs(logs: string) {
  const result = await summarizeAuditLogs({ logs });
  return result;
}
