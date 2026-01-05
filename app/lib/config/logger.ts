/**
 * Structured Logging System
 *
 * Production-ready logging with multiple transports and structured data
 */

import { getMonitoringConfig, isProduction, isDevelopment } from './environment';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  service: string;
  userId?: string;
  requestId?: string;
  sessionId?: string;
  ip?: string;
  userAgent?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  duration?: number;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  metadata?: Record<string, any>;
}

class Logger {
  private level: LogLevel;
  private service: string;

  constructor(service = 'ai-agency') {
    const config = getMonitoringConfig();
    this.level = LogLevel[config.logging.level.toUpperCase() as keyof typeof LogLevel] || LogLevel.INFO;
    this.service = service;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.level;
  }

  private formatLogEntry(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.service,
      ...metadata,
    };

    return entry;
  }

  private writeLog(entry: LogEntry): void {
    const levelName = LogLevel[entry.level];

    if (isProduction()) {
      // In production, write structured JSON logs
      console.log(JSON.stringify(entry));
    } else {
      // In development, use colored console output
      const colors = {
        [LogLevel.ERROR]: '\x1b[31m', // Red
        [LogLevel.WARN]: '\x1b[33m',  // Yellow
        [LogLevel.INFO]: '\x1b[36m',  // Cyan
        [LogLevel.DEBUG]: '\x1b[35m', // Magenta
      };

      const reset = '\x1b[0m';
      const color = colors[entry.level] || colors[LogLevel.INFO];

      console.log(`${color}[${entry.service}] ${levelName}:${reset} ${entry.message}`);

      // Log additional metadata in development
      if (entry.metadata && Object.keys(entry.metadata).length > 0) {
        console.log(`${color}Metadata:${reset}`, entry.metadata);
      }

      if (entry.error) {
        console.log(`${color}Error:${reset}`, entry.error);
      }
    }

    // TODO: Send to external monitoring service (Sentry, DataDog, etc.)
    // if (entry.level <= LogLevel.ERROR) {
    //   sendToMonitoring(entry);
    // }
  }

  error(message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    const entry = this.formatLogEntry(LogLevel.ERROR, message, metadata);
    this.writeLog(entry);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.WARN)) return;
    const entry = this.formatLogEntry(LogLevel.WARN, message, metadata);
    this.writeLog(entry);
  }

  info(message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.INFO)) return;
    const entry = this.formatLogEntry(LogLevel.INFO, message, metadata);
    this.writeLog(entry);
  }

  debug(message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    const entry = this.formatLogEntry(LogLevel.DEBUG, message, metadata);
    this.writeLog(entry);
  }

  // Specialized logging methods
  request(
    method: string,
    url: string,
    statusCode: number,
    duration: number,
    metadata?: Record<string, any>
  ): void {
    const level = statusCode >= 500 ? LogLevel.ERROR :
                  statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;

    const message = `${method} ${url} ${statusCode} ${duration}ms`;

    this.log(level, message, {
      method,
      url,
      statusCode,
      duration,
      ...metadata,
    });
  }

  generation(
    generationId: string,
    userId: string,
    status: string,
    metadata?: Record<string, any>
  ): void {
    const message = `Generation ${generationId} status: ${status}`;
    this.info(message, {
      generationId,
      userId,
      status,
      ...metadata,
    });
  }

  payment(
    transactionHash: string,
    userId: string,
    amount: string,
    status: 'success' | 'failed' | 'pending',
    metadata?: Record<string, any>
  ): void {
    const level = status === 'failed' ? LogLevel.ERROR :
                  status === 'pending' ? LogLevel.DEBUG : LogLevel.INFO;

    const message = `Payment ${status}: ${amount} LYX (${transactionHash.slice(0, 10)}...)`;
    this.log(level, message, {
      transactionHash,
      userId,
      amount,
      status,
      ...metadata,
    });
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(level)) return;
    const entry = this.formatLogEntry(level, message, metadata);
    this.writeLog(entry);
  }
}

// Create default logger instance
export const logger = new Logger();

// Create specialized loggers for different services
export const loggers = {
  api: new Logger('api'),
  database: new Logger('database'),
  blockchain: new Logger('blockchain'),
  ai: new Logger('ai-service'),
  storage: new Logger('storage'),
  auth: new Logger('auth'),
};

// Helper function to create request context for logging
export function createRequestContext(request: Request): Record<string, any> {
  const url = new URL(request.url);
  return {
    method: request.method,
    url: request.url,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    referer: request.headers.get('referer'),
  };
}

// Helper function to create error context for logging
export function createErrorContext(error: Error): Record<string, any> {
  return {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  };
}

// Performance logging helper
export function logPerformance(operation: string, startTime: number, metadata?: Record<string, any>): void {
  const duration = Date.now() - startTime;
  logger.debug(`Performance: ${operation} took ${duration}ms`, {
    operation,
    duration,
    ...metadata,
  });
}

// Create a performance timer
export function createTimer(): { start: () => number; end: (operation: string, metadata?: Record<string, any>) => void } {
  let startTime: number;

  return {
    start: () => {
      startTime = Date.now();
      return startTime;
    },
    end: (operation: string, metadata?: Record<string, any>) => {
      logPerformance(operation, startTime, metadata);
    },
  };
}
