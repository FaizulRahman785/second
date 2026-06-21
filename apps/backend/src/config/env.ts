import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.BACKEND_PORT || '3001'),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'coaching-platform-jwt-secret-2024',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || '*',
} as const;

export function validateEnv() {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is not set');
  }
}
