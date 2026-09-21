/**
 * Lightweight sliding-window rate limiter for Next.js Route Handlers.
 * Protects lead intake and file upload APIs against automated spam and DoS.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic garbage collection every 10 minutes
if (typeof setInterval !== 'undefined') {
  const timer = setInterval(() => {
    const now = Date.now();
    rateLimitStore.forEach((record, key) => {
      // Retain only timestamps from the last 1 hour
      const recent = record.timestamps.filter((ts) => now - ts < 3600 * 1000);
      if (recent.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, { timestamps: recent });
      }
    });
  }, 10 * 60 * 1000);

  if (timer && typeof timer.unref === 'function') {
    timer.unref();
  }
}

export interface RateLimitOptions {
  limit: number; // Maximum allowed requests
  windowMs: number; // Time window in milliseconds
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 10, windowMs: 15 * 60 * 1000 }
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - options.windowMs;

  const record = rateLimitStore.get(identifier) || { timestamps: [] };

  // Filter timestamps within current sliding window
  const validTimestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (validTimestamps.length >= options.limit) {
    const oldest = validTimestamps[0];
    const resetMs = oldest + options.windowMs - now;

    return {
      success: false,
      limit: options.limit,
      remaining: 0,
      resetMs: Math.max(0, resetMs),
    };
  }

  // Record this request
  validTimestamps.push(now);
  rateLimitStore.set(identifier, { timestamps: validTimestamps });

  return {
    success: true,
    limit: options.limit,
    remaining: options.limit - validTimestamps.length,
    resetMs: options.windowMs,
  };
}

/**
 * Extracts client IP identifier safely from NextRequest headers.
 */
export function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return 'anonymous-client';
}
