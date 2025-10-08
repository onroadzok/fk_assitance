import { useQuery } from '@tanstack/react-query';
import { analyticsAPI } from '@/services/api';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await analyticsAPI.getDashboard();
      return data;
    },
    refetchInterval: 30000,
  });
};

export const useCourseStats = (courseId: string) => {
  return useQuery({
    queryKey: ['course-stats', courseId],
    queryFn: async () => {
      const { data } = await analyticsAPI.getCourseStats(courseId);
      return data;
    },
    enabled: !!courseId,
  });
};
