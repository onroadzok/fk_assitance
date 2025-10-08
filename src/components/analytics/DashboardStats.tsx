import { Card, CardContent } from '@/components/ui/Card';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import type { DashboardStats as Stats } from '@/types';

interface DashboardStatsProps {
  stats: Stats;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const total = stats.total || 0;
  const presentes = stats.presentes || 0;
  const ausentes = stats.ausentes || 0;
  const tardanzas = stats.tardanzas || 0;

  const calcPercentage = (val: number) => total > 0 ? ((val / total) * 100).toFixed(1) : '0.0';

  const statCards = [
    { label: 'Total', value: total, icon: Users, color: 'blue' },
    { label: 'Presentes', value: `${presentes} (${calcPercentage(presentes)}%)`, icon: UserCheck, color: 'green' },
    { label: 'Ausentes', value: `${ausentes} (${calcPercentage(ausentes)}%)`, icon: UserX, color: 'red' },
    { label: 'Tardanzas', value: `${tardanzas} (${calcPercentage(tardanzas)}%)`, icon: Clock, color: 'yellow' },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
    red: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="flex items-center">
              <div className={`p-3 rounded-full ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
