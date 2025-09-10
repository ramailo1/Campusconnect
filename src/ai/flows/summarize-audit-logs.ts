// Summarizes audit logs using AI to identify unusual activity and potential security breaches.

'use server';

/**
 * @fileOverview Summarizes audit logs using AI.
 *
 * - summarizeAuditLogs - A function that summarizes audit logs.
 * - SummarizeAuditLogsInput - The input type for the summarizeAuditLogs function.
 * - SummarizeAuditLogsOutput - The return type for the summarizeAuditLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAuditLogsInputSchema = z.object({
  logs: z
    .string()
    .describe('The audit logs to summarize.  Should be a string.'),
});
export type SummarizeAuditLogsInput = z.infer<typeof SummarizeAuditLogsInputSchema>;

const SummarizeAuditLogsOutputSchema = z.object({
  summary: z.string().describe('A summary of the audit logs.'),
  potentialIssues: z
    .string()
    .describe('A list of potential security issues identified in the logs.'),
});
export type SummarizeAuditLogsOutput = z.infer<typeof SummarizeAuditLogsOutputSchema>;

export async function summarizeAuditLogs(input: SummarizeAuditLogsInput): Promise<SummarizeAuditLogsOutput> {
  return summarizeAuditLogsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAuditLogsPrompt',
  input: {schema: SummarizeAuditLogsInputSchema},
  output: {schema: SummarizeAuditLogsOutputSchema},
  prompt: `You are an AI expert in summarizing audit logs for security purposes.

You are given a set of audit logs.  You will summarize the logs and identify any potential security issues.

Audit Logs:
{{{logs}}}
`,
});

const summarizeAuditLogsFlow = ai.defineFlow(
  {
    name: 'summarizeAuditLogsFlow',
    inputSchema: SummarizeAuditLogsInputSchema,
    outputSchema: SummarizeAuditLogsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
