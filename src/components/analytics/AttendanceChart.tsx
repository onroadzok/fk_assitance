import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import type { DashboardStats } from '@/types';

interface AttendanceChartProps {
  stats: DashboardStats;
}

export const AttendanceChart = ({ stats }: AttendanceChartProps) => {
  const data = [
    { name: 'Presentes', value: stats.presentes || 0, color: '#10b981' },
    { name: 'Ausentes', value: stats.ausentes || 0, color: '#ef4444' },
    { name: 'Tardanzas', value: stats.tardanzas || 0, color: '#f59e0b' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Asistencia</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
