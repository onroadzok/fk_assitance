export type ReportType = 'ATTENDANCE_SUMMARY' | 'STUDENT_DETAIL' | 'COURSE_STATISTICS' | 'COMPARATIVE';
export type ReportFormat = 'PDF' | 'CSV' | 'EXCEL';
export type ReportStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
export type AttendanceStatus = 'PRESENTE' | 'AUSENTE' | 'TARDANZA';
export type UserRole = 'admin' | 'profesor' | 'estudiante';

export interface User {
  userId: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface Report {
  id: string;
  type: ReportType;
  format: ReportFormat;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  filters?: ReportFilters;
  downloadUrl?: string;
  error?: string;
}

export interface ReportFilters {
  courseId?: string;
  studentId?: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateReportRequest {
  type: ReportType;
  format: ReportFormat;
  filters?: ReportFilters;
}

export interface DashboardStats {
  total: number;
  presentes: number;
  ausentes: number;
  tardanzas: number;
  porcentajeAsistencia: number | null;
}

export interface CourseStats {
  courseId: string;
  courseName: string;
  totalSessions: number;
  totalStudents: number;
  attendanceRate: number;
  students?: StudentAttendance[];
  trendData?: TrendData[];
}

export interface StudentAttendance {
  studentId: string;
  studentName: string;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendancePercentage: number;
}

export interface TrendData {
  date: string;
  presentCount: number;
  absentCount: number;
  lateCount: number;
}

export interface TopCourse {
  courseId: string;
  courseName: string;
  attendanceRate: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
