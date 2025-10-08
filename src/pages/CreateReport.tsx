import { ReportForm } from '@/components/reports/ReportForm';

export const CreateReport = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Generar Nuevo Reporte</h1>
      <div className="max-w-2xl">
        <ReportForm />
      </div>
    </div>
  );
};
