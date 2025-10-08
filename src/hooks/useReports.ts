import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportAPI } from '@/services/api';
import type { CreateReportRequest } from '@/types';
import toast from 'react-hot-toast';

export const useReports = (params?: {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: ['reports', params],
    queryFn: async () => {
      const { data } = await reportAPI.list(params);
      return data;
    },
    refetchInterval: (query) => {
      const hasPending = query.state.data?.data.some(
        (r) => r.status === 'PENDING' || r.status === 'PROCESSING'
      );
      return hasPending ? 5000 : false;
    },
  });
};

export const useReport = (id: string) => {
  return useQuery({
    queryKey: ['report', id],
    queryFn: async () => {
      const { data } = await reportAPI.getById(id);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReportRequest) => {
      const response = await reportAPI.generate(data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast.success(`Reporte generado con ID: ${data.id}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al generar reporte');
    },
  });
};

export const useDownloadReport = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await reportAPI.download(id);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al descargar reporte');
    },
  });
};
