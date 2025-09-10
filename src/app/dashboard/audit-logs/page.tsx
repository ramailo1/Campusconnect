import { AuditLogClient } from './audit-log-client';
import { auditLogs as logsData } from '@/lib/data';

export const revalidate = 0;

export default function AuditLogPage() {
  const logs = logsData;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Audit Logs</h1>
      </div>
      <AuditLogClient logs={logs} />
    </>
  );
}
