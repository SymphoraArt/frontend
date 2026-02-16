// Type declaration for bottleneck module
// Bottleneck v2 includes TypeScript types, but they may not be resolved correctly during Next.js build
declare module 'bottleneck' {
  export default class Bottleneck {
    constructor(options?: {
      maxConcurrent?: number;
      minTime?: number;
      reservoir?: number;
      reservoirRefreshAmount?: number;
      reservoirRefreshInterval?: number;
      retryOnce?: boolean;
      id?: string;
      datastore?: string;
      trackDoneStatus?: boolean;
    });
    schedule<T>(fn: () => T | Promise<T>): Promise<T>;
    schedule<T>(options: { id?: string }, fn: () => T | Promise<T>): Promise<T>;
    counts(): { QUEUED: number; RUNNING: number; EXECUTING: number; DONE: number };
    stop(options?: { dropWaitingJobs?: boolean }): Promise<void>;
    updateSettings(settings: {
      maxConcurrent?: number;
      minTime?: number;
      reservoir?: number;
      reservoirRefreshAmount?: number;
    }): void;
    on(event: 'failed', callback: (error: Error, jobInfo: { retryCount: number }) => number | undefined | Promise<number | undefined>): void;
    on(event: 'depleted', callback: (empty: boolean) => void): void;
    on(event: 'done', callback: (info: { options: { id?: string }; retryCount: number }) => void): void;
  }
}

