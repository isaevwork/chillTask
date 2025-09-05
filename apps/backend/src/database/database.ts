import sqlite3 from 'sqlite3';
import { TimeEntry } from '../models/TimeEntry';

interface TimeEntryRow {
  id: string;
  description: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  category: string | null;
  tags: string | null;
  createdAt: string;
  updatedAt: string;
}

export class Database {
  private static db: sqlite3.Database;

  static async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database('timekeeper.db', (err) => {
        if (err) {
          reject(err);
          return;
        }

        this.createTables()
          .then(() => resolve())
          .catch(reject);
      });
    });
  }

  private static async createTables(): Promise<void> {
    return new Promise((resolve, reject) => {
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS time_entries (
          id TEXT PRIMARY KEY,
          description TEXT NOT NULL,
          startTime TEXT NOT NULL,
          endTime TEXT,
          duration INTEGER,
          category TEXT,
          tags TEXT,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        )
      `;

      this.db.run(createTableSQL, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async createTimeEntry(
    timeEntry: Omit<TimeEntry, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TimeEntry> {
    return new Promise((resolve, reject) => {
      const id = require('uuid').v4();
      const now = new Date().toISOString();

      const sql = `
        INSERT INTO time_entries (id, description, startTime, endTime, duration, category, tags, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      this.db.run(
        sql,
        [
          id,
          timeEntry.description,
          timeEntry.startTime.toISOString(),
          timeEntry.endTime?.toISOString() || null,
          timeEntry.duration || null,
          timeEntry.category || null,
          timeEntry.tags || null,
          now,
          now,
        ],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id,
              ...timeEntry,
              createdAt: new Date(now),
              updatedAt: new Date(now),
            });
          }
        },
      );
    });
  }

  static async getAllTimeEntries(): Promise<TimeEntry[]> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM time_entries ORDER BY startTime DESC';

      this.db.all(sql, [], (err, rows: TimeEntryRow[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            rows.map((row) => ({
              ...row,
              startTime: new Date(row.startTime),
              endTime: row.endTime ? new Date(row.endTime) : undefined,
              duration: row.duration || undefined,
              category: row.category || undefined,
              tags: row.tags || undefined,
              createdAt: new Date(row.createdAt),
              updatedAt: new Date(row.updatedAt),
            })),
          );
        }
      });
    });
  }

  static async getTimeEntryById(id: string): Promise<TimeEntry | null> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM time_entries WHERE id = ?';

      this.db.get(sql, [id], (err, row: TimeEntryRow | undefined) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          resolve({
            ...row,
            startTime: new Date(row.startTime),
            endTime: row.endTime ? new Date(row.endTime) : undefined,
            duration: row.duration || undefined,
            category: row.category || undefined,
            tags: row.tags || undefined,
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt),
          });
        }
      });
    });
  }

  static async updateTimeEntry(id: string, updates: Partial<TimeEntry>): Promise<TimeEntry | null> {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      const setFields: string[] = [];
      const values: unknown[] = [];

      if (updates.description !== undefined) {
        setFields.push('description = ?');
        values.push(updates.description);
      }
      if (updates.startTime !== undefined) {
        setFields.push('startTime = ?');
        values.push(updates.startTime.toISOString());
      }
      if (updates.endTime !== undefined) {
        setFields.push('endTime = ?');
        values.push(updates.endTime?.toISOString() || null);
      }
      if (updates.duration !== undefined) {
        setFields.push('duration = ?');
        values.push(updates.duration);
      }
      if (updates.category !== undefined) {
        setFields.push('category = ?');
        values.push(updates.category);
      }
      if (updates.tags !== undefined) {
        setFields.push('tags = ?');
        values.push(updates.tags);
      }

      setFields.push('updatedAt = ?');
      values.push(now);
      values.push(id);

      const sql = `UPDATE time_entries SET ${setFields.join(', ')} WHERE id = ?`;

      this.db.run(sql, values, function (err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          resolve(null);
        } else {
          // Return updated record
          Database.getTimeEntryById(id).then(resolve).catch(reject);
        }
      });
    });
  }

  static async deleteTimeEntry(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM time_entries WHERE id = ?';

      this.db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  static async getCurrentSession(): Promise<TimeEntry | null> {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT * FROM time_entries WHERE endTime IS NULL ORDER BY startTime DESC LIMIT 1';

      this.db.get(sql, [], (err, row: TimeEntryRow | undefined) => {
        if (err) {
          reject(err);
        } else if (!row) {
          resolve(null);
        } else {
          resolve({
            ...row,
            startTime: new Date(row.startTime),
            endTime: row.endTime ? new Date(row.endTime) : undefined,
            duration: row.duration || undefined,
            category: row.category || undefined,
            tags: row.tags || undefined,
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt),
          });
        }
      });
    });
  }

  static close(): void {
    if (this.db) {
      this.db.close();
    }
  }
}
