import { Subject, Week } from '@prisma/client';

export type FormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      inputs?: Record<string, string | number>;
      success?: boolean;
    }
  | undefined;

export type FullSubjectType =
  | (Subject & {
      weeks: Week[];
    })
  | null;
