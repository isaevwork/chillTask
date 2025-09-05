export interface TimeEntry {
  id: number;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  category?: string;
  tags?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTimeEntryRequest {
  description: string;
  startTime: string;
  endTime?: string;
  category?: string;
  tags?: string;
}

export interface UpdateTimeEntryRequest {
  description?: string;
  startTime?: string;
  endTime?: string;
  category?: string;
  tags?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
