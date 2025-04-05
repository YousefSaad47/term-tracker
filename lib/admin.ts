import { getCurrentUser } from '@/actions/user-actions';

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

export function withAuth<TArgs extends unknown[], TReturn>(
  fn: (user: CurrentUser, ...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn | undefined> {
  return async (...args: TArgs): Promise<TReturn | undefined> => {
    const currentUser = await getCurrentUser();
    if (!currentUser) return undefined;
    return fn(currentUser, ...args);
  };
}

export function withAdmin<TArgs extends unknown[], TReturn>(
  fn: (user: CurrentUser, ...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn | undefined> {
  return async (...args: TArgs): Promise<TReturn | undefined> => {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') return undefined;
    return fn(currentUser, ...args);
  };
}
