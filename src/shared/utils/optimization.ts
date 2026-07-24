// Phase 14 Performance Optimization Engine

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const MEMORY_CACHE: Record<string, CacheEntry<any>> = {};

export class OptimizationService {
  // Memoized Memory Cache with TTL (Reduces API calls & DB queries)
  static getCached<T>(key: string): T | null {
    const entry = MEMORY_CACHE[key];
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      delete MEMORY_CACHE[key];
      return null;
    }
    return entry.data as T;
  }

  static setCache<T>(key: string, data: T, ttlSeconds: number = 300): void {
    MEMORY_CACHE[key] = {
      data,
      expiry: Date.now() + ttlSeconds * 1000,
    };
  }

  static clearCache(): void {
    Object.keys(MEMORY_CACHE).forEach((k) => delete MEMORY_CACHE[k]);
  }

  // Request Debouncer (Optimizes rendering & search indexing)
  static debounce<T extends (...args: any[]) => any>(func: T, waitMs: number): (...args: Parameters<T>) => void {
    let timeout: any;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), waitMs);
    };
  }

  // Throttle Utility
  static throttle<T extends (...args: any[]) => any>(func: T, limitMs: number): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limitMs);
      }
    };
  }
}
