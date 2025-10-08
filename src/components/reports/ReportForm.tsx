import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCreateReport } from '@/hooks/useReports';
import type { ReportType, ReportFormat } from '@/types';

export const ReportForm = () => {
  const { mutate: createReport, isPending } = useCreateReport();
  const [formData, setFormData] = useState({
    type: 'ATTENDANCE_SUMMARY' as ReportType,
    format: 'PDF' as ReportFormat,
    courseId: '',
    studentId: '',
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { type, format, courseId, studentId, startDate, endDate } = formData;
    createReport({
      type,
      format,
      filters: {
        ...(courseId && { courseId }),
        ...(studentId && { studentId }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generar Nuevo Reporte</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Reporte</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ReportType })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
            >
              <option value="ATTENDANCE_SUMMARY">Resumen de Asistencia</option>
              <option value="STUDENT_DETAIL">Detalle por Estudiante</option>
              <option value="COURSE_STATISTICS">Estadísticas por Curso</option>
              <option value="COMPARATIVE">Comparativo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Formato</label>
            <div className="flex gap-4">
              {['PDF', 'CSV', 'EXCEL'].map((fmt) => (
                <label key={fmt} className="flex items-center">
                  <input
                    type="radio"
                    value={fmt}
                    checked={formData.format === fmt}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value as ReportFormat })}
                    className="mr-2"
                  />
                  {fmt}
                </label>
              ))}
            </div>
          </div>

          <Input
            label="ID del Curso (opcional)"
            value={formData.courseId}
            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
          />

          <Input
            label="ID del Estudiante (opcional)"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Fecha Inicio"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Input
              label="Fecha Fin"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>

          <Button type="submit" isLoading={isPending} className="w-full">
            Generar Reporte
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
