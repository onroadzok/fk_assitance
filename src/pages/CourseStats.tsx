import { useParams } from 'react-router-dom';
import { useCourseStats } from '@/hooks/useAnalytics';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CourseStats = () => {
  const { id } = useParams<{ id: string }>();
  const { data: stats, isLoading, error } = useCourseStats(id || '');

  if (isLoading) return <div className="text-center py-12">Cargando...</div>;
  if (error || !stats) return <div className="text-center py-12 text-red-600">Error al cargar estadísticas</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{stats.courseName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Sesiones</p>
            <p className="text-3xl font-bold">{stats.totalSessions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Estudiantes</p>
            <p className="text-3xl font-bold">{stats.totalStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Tasa Asistencia</p>
            <p className="text-3xl font-bold text-green-600">{stats.attendanceRate.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {stats.trendData && (
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="presentCount" stroke="#10b981" name="Presentes" />
                <Line type="monotone" dataKey="absentCount" stroke="#ef4444" name="Ausentes" />
                <Line type="monotone" dataKey="lateCount" stroke="#f59e0b" name="Tardanzas" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {stats.students && (
        <Card>
          <CardHeader>
            <CardTitle>Estudiantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.students.map((student) => (
                <div key={student.studentId} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span>{student.studentName}</span>
                  <span className="font-bold">{student.attendancePercentage.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
