import { Database } from '../database/database';
import { TimeEntry, CreateTimeEntryRequest, UpdateTimeEntryRequest } from '../models/TimeEntry';

export class TimeEntryService {
  static async createTimeEntry(data: CreateTimeEntryRequest): Promise<TimeEntry> {
    const timeEntry: Omit<TimeEntry, 'id' | 'createdAt' | 'updatedAt'> = {
      description: data.description,
      startTime: new Date(data.startTime),
      endTime: data.endTime ? new Date(data.endTime) : undefined,
      category: data.category,
      tags: data.tags,
    };

    if (timeEntry.endTime) {
      timeEntry.duration = Math.floor(
        (timeEntry.endTime.getTime() - timeEntry.startTime.getTime()) / 1000,
      );
    }

    return Database.createTimeEntry(timeEntry);
  }

  static async getAllTimeEntries(): Promise<TimeEntry[]> {
    return Database.getAllTimeEntries();
  }

  static async getTimeEntryById(id: string): Promise<TimeEntry | null> {
    return Database.getTimeEntryById(id);
  }

  static async updateTimeEntry(
    id: string,
    data: UpdateTimeEntryRequest,
  ): Promise<TimeEntry | null> {
    const updates: Partial<TimeEntry> = {};

    if (data.description !== undefined) {
      updates.description = data.description;
    }
    if (data.startTime !== undefined) {
      updates.startTime = new Date(data.startTime);
    }
    if (data.endTime !== undefined) {
      updates.endTime = data.endTime ? new Date(data.endTime) : undefined;
    }
    if (data.category !== undefined) {
      updates.category = data.category;
    }
    if (data.tags !== undefined) {
      updates.tags = data.tags;
    }

    // Recalculate duration if both start and end times are provided
    if (updates.startTime && updates.endTime) {
      updates.duration = Math.floor(
        (updates.endTime.getTime() - updates.startTime.getTime()) / 1000,
      );
    }

    return Database.updateTimeEntry(id, updates);
  }

  static async deleteTimeEntry(id: string): Promise<boolean> {
    return Database.deleteTimeEntry(id);
  }

  static async getCurrentSession(): Promise<TimeEntry | null> {
    return Database.getCurrentSession();
  }

  static async stopCurrentSession(): Promise<TimeEntry | null> {
    const currentSession = await this.getCurrentSession();
    if (!currentSession) {
      return null;
    }

    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - currentSession.startTime.getTime()) / 1000);

    return Database.updateTimeEntry(currentSession.id, {
      endTime,
      duration,
    });
  }
}
