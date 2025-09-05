import express from 'express';
import { TimeEntryService } from '../services/timeEntryService';
import { CreateTimeEntryRequest, UpdateTimeEntryRequest } from '../models/TimeEntry';

const router = express.Router();

// GET /time-entries - Get all time entries
router.get('/', async (req, res) => {
  try {
    const timeEntries = await TimeEntryService.getAllTimeEntries();
    res.json(timeEntries);
  } catch (error) {
    console.error('Error getting time entries:', error);
    res.status(500).json({ error: 'Failed to get time entries' });
  }
});

// POST /time-entries - Create a new time entry
router.post('/', async (req, res) => {
  try {
    const data: CreateTimeEntryRequest = req.body;

    // Basic validation
    if (!data.description || !data.startTime) {
      return res.status(400).json({ error: 'Description and startTime are required' });
    }

    const timeEntry = await TimeEntryService.createTimeEntry(data);
    res.status(201).json(timeEntry);
  } catch (error) {
    console.error('Error creating time entry:', error);
    res.status(500).json({ error: 'Failed to create time entry' });
  }
});

// GET /time-entries/current - Get current active session
router.get('/current', async (req, res) => {
  try {
    const currentSession = await TimeEntryService.getCurrentSession();
    res.json(currentSession);
  } catch (error) {
    console.error('Error getting current session:', error);
    res.status(500).json({ error: 'Failed to get current session' });
  }
});

// POST /time-entries/stop - Stop current session
router.post('/stop', async (req, res) => {
  try {
    const stoppedSession = await TimeEntryService.stopCurrentSession();
    if (!stoppedSession) {
      return res.status(404).json({ error: 'No active session found' });
    }
    res.json(stoppedSession);
  } catch (error) {
    console.error('Error stopping current session:', error);
    res.status(500).json({ error: 'Failed to stop current session' });
  }
});

// GET /time-entries/:id - Get time entry by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const timeEntry = await TimeEntryService.getTimeEntryById(id);

    if (!timeEntry) {
      return res.status(404).json({ error: 'Time entry not found' });
    }

    res.json(timeEntry);
  } catch (error) {
    console.error('Error getting time entry:', error);
    res.status(500).json({ error: 'Failed to get time entry' });
  }
});

// PATCH /time-entries/:id - Update time entry
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data: UpdateTimeEntryRequest = req.body;

    const updatedTimeEntry = await TimeEntryService.updateTimeEntry(id, data);

    if (!updatedTimeEntry) {
      return res.status(404).json({ error: 'Time entry not found' });
    }

    res.json(updatedTimeEntry);
  } catch (error) {
    console.error('Error updating time entry:', error);
    res.status(500).json({ error: 'Failed to update time entry' });
  }
});

// DELETE /time-entries/:id - Delete time entry
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await TimeEntryService.deleteTimeEntry(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Time entry not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting time entry:', error);
    res.status(500).json({ error: 'Failed to delete time entry' });
  }
});

export { router as timeEntryRoutes };
