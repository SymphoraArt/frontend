/**
 * Logger Module
 * 
 * Simple logger wrapper for backend services
 */

import { logger } from '../app/lib/config/logger';

/**
 * Log function for backend services
 * 
 * @param message - Log message
 * @param service - Service name (optional)
 */
export function log(message: string, service?: string): void {
  if (service) {
    logger.info(`[${service}] ${message}`);
  } else {
    logger.info(message);
  }
}

