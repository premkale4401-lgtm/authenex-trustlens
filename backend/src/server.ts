import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT: number = parseInt(process.env.PORT || '4000', 10);

// Security middleware
app.use(helmet());

// CORS - allow frontend to connect
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Logging
app.use(morgan('dev'));

// Parse JSON bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'operational',
    service: 'Authenex API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Test endpoint
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ 
    message: 'Backend connected successfully!',
    data: {
      features: ['image-analysis', 'video-analysis', 'document-forensics', 'email-verification', 'text-analysis']
    }
  });
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Authenex API running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 Security: Helmet enabled`);
  console.log(`🌐 CORS: Enabled for ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});