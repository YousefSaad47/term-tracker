import { Subject, Week } from '@prisma/client';

export type FormData = {
  name?: string;
  email?: string;
  password?: string;
  slug?: string;
  description?: string;
  content?: string;
  weekNumber?: number;
  subjectId?: string;
};

export type FormState =
  | {
      errors?: FormData;
      message?: string;
      inputs?: FormData;
      success?: boolean;
    }
  | undefined;

export type FullSubjectType =
  | (Subject & {
      weeks: Week[];
    })
  | null;
