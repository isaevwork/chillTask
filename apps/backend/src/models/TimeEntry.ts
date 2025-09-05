export interface TimeEntry {
  id: string;
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
