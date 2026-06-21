// ============================================
// JWT UTILITIES
// ============================================

import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import type { AuthUser } from '../../../packages/shared-types/src/index.js';

export function generateToken(payload: AuthUser): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function decodeToken(token: string): any {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
}
