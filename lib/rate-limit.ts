import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

let cached: Ratelimit | null = null;
let warned = false;

function getRatelimit(): Ratelimit | null {
  if (cached) return cached;
  try {
    cached = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '30 s'),
      analytics: true,
      prefix: '@upstash/ratelimit-server-actions',
    });
    return cached;
  } catch (error) {
    if (!warned) {
      warned = true;
      console.error('Rate limiter unavailable (fail-open):', error);
    }
    return null;
  }
}

export async function checkRateLimit(identifier: string) {
  const rl = getRatelimit();
  if (!rl) {
    return { success: true, limit: 0, remaining: 0, reset: 0 } as const;
  }
  try {
    return await rl.limit(identifier);
  } catch (error) {
    console.error('Rate limit check failed (fail-open):', error);
    return { success: true, limit: 0, remaining: 0, reset: 0 } as const;
  }
}

export async function isRateLimited(action: string): Promise<boolean> {
  try {
    const headerList = await headers();
    const ip =
      headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const { success } = await checkRateLimit(`${action}_${ip}`);
    return !success;
  } catch (error) {
    console.error('Rate limit check failed (fail-open):', error);
    return false;
  }
}

export const RATE_LIMIT_MESSAGE =
  'Too many requests. Please try again in 30 seconds.';

export function withRateLimit<TArgs extends unknown[], TReturn>(
  action: string,
  fn: (...args: TArgs) => Promise<TReturn>,
  limitedResponse: TReturn
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    if (await isRateLimited(action)) {
      return limitedResponse;
    }
    return fn(...args);
  };
}
