'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export const FetchInterceptor = () => {
  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const res = await originalFetch(...args);

      if (res.status === 429 && res.headers.get('X-Rate-Limited') === 'true') {
        const retryAfter = res.headers.get('Retry-After');

        toast.error(
          `Too many requests. Please try again in ${retryAfter} seconds.`
        );

        return new Response(null, { status: 200 });
      }

      return res;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
};
