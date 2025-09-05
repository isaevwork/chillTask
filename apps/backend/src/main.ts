import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { timeEntryRoutes } from './routes/timeEntryRoutes';
import { Database } from './database/database';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'TimeKeeper API is running!' });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'TimeKeeper API',
  });
});

app.use('/time-entries', timeEntryRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start server
async function startServer() {
  try {
    await Database.initialize();
    console.log('Database initialized successfully');

    app.listen(port, () => {
      console.log(`Server is running on: http://localhost:${port}`);
      console.log(`Health check: http://localhost:${port}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
