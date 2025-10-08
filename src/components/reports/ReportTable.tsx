import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import type { Report } from '@/types';
import { useDownloadReport } from '@/hooks/useReports';

interface ReportTableProps {
  reports: Report[];
}

export const ReportTable = ({ reports }: ReportTableProps) => {
  const { mutate: download, isPending } = useDownloadReport();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Formato</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell className="font-mono text-xs">{report.id.slice(0, 8)}</TableCell>
            <TableCell>{report.type.replace('_', ' ')}</TableCell>
            <TableCell>{report.format}</TableCell>
            <TableCell>
              <Badge status={report.status} />
            </TableCell>
            <TableCell>{format(new Date(report.createdAt), 'dd/MM/yyyy HH:mm')}</TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => download(report.id)}
                disabled={report.status !== 'COMPLETED' || isPending}
              >
                <Download className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
