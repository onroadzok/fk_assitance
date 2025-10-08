import { useState } from 'react';
import { useReports } from '@/hooks/useReports';
import { ReportTable } from '@/components/reports/ReportTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const ReportsList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    type: '',
    status: '',
  });

  const { data, isLoading, error } = useReports(filters);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reportes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
              >
                <option value="">Todos</option>
                <option value="ATTENDANCE_SUMMARY">Resumen</option>
                <option value="STUDENT_DETAIL">Detalle</option>
                <option value="COURSE_STATISTICS">Estadísticas</option>
                <option value="COMPARATIVE">Comparativo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
              >
                <option value="">Todos</option>
                <option value="PENDING">Pendiente</option>
                <option value="PROCESSING">Procesando</option>
                <option value="COMPLETED">Completado</option>
                <option value="FAILED">Fallido</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading && <div className="p-6 text-center">Cargando...</div>}
          {error && <div className="p-6 text-center text-red-600">Error al cargar reportes</div>}
          {data && <ReportTable reports={data.data} />}
        </CardContent>
      </Card>

      {data && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {data.data.length} de {data.total} reportes
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              disabled={filters.page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-3 py-1">
              Página {filters.page} de {data.totalPages}
            </span>
            <button
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              disabled={filters.page >= data.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
