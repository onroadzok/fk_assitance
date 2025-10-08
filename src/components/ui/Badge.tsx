import type { ReportStatus } from '@/types';

interface BadgeProps {
  status: ReportStatus;
}

const statusConfig = {
  PENDING: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  PROCESSING: { label: 'Procesando', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  COMPLETED: { label: 'Completado', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  FAILED: { label: 'Fallido', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
};

export const Badge = ({ status }: BadgeProps) => {
  const config = statusConfig[status];
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
};
