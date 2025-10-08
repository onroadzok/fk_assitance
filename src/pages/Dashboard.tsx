import { useDashboardStats } from '@/hooks/useAnalytics';
import { DashboardStats } from '@/components/analytics/DashboardStats';
import { AttendanceChart } from '@/components/analytics/AttendanceChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const Dashboard = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return <div className="text-center py-12">Cargando estadísticas...</div>;
  }

  if (error || !stats) {
    return <div className="text-center py-12 text-red-600">Error al cargar estadísticas</div>;
  }

  const total = stats.total || 0;
  const presentes = stats.presentes || 0;
  const ausentes = stats.ausentes || 0;
  const tardanzas = stats.tardanzas || 0;

  const calcPercentage = (val: number) => total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard de Asistencia</h1>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart stats={stats} />

        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span>Tasa de Asistencia</span>
                <span className="font-bold text-green-600">{calcPercentage(presentes)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span>Tasa de Ausencias</span>
                <span className="font-bold text-red-600">{calcPercentage(ausentes)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <span>Tasa de Tardanzas</span>
                <span className="font-bold text-yellow-600">{calcPercentage(tardanzas)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
