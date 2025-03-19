import { z } from 'zod';

export const createSubjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  slug: z.string().min(1, 'Slug is required'),
  intro: z.string().optional(),
});

export const subjectUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  slug: z.string().optional(),
  intro: z.string().optional(),
});

export const createWeekSchema = z.object({
  weekNumber: z.coerce
    .number()
    .int()
    .min(1, 'Minimum week is 1')
    .max(14, 'Maximum week is 14'),
  content: z.string().optional(),
  isPublished: z.preprocess(
    (val) => (typeof val === 'string' ? val === 'on' : val),
    z.boolean().optional()
  ),
});

export const updateWeekSchema = z.object({
  weekNumber: z.coerce
    .number()
    .int()
    .min(1, 'Minimum week is 1')
    .max(14, 'Maximum week is 14'),
  content: z.string().optional(),
  isPublished: z.preprocess(
    (val) => (typeof val === 'string' ? val === 'on' : val),
    z.boolean().optional()
  ),
});

export const createNewsSchema = z.object({
  content: z.string(),
  isPublished: z.preprocess(
    (val) => (typeof val === 'string' ? val === 'on' : val),
    z.boolean().optional()
  ),
});

export const updateNewsSchema = z.object({
  content: z.string().optional(),
  isPublished: z.preprocess(
    (val) => (typeof val === 'string' ? val === 'on' : val),
    z.boolean().optional()
  ),
});

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});
