import { z } from 'zod';

export const perjalananSchema = z.object({
  body: z.object({
    arah: z
      .string({ required_error: 'Arah perjalanan is required' })
      .min(3, 'Arah perjalanan must be at least 3 characters long'),
    ketahanan: z.string().optional(),
  }),
});

export const updatePerjalananSchema = z.object({
    body: z.object({
        arah: z.string().min(3, 'Arah perjalanan must be at least 3 characters long').optional(),
        ketahanan: z.string().optional(),
      }),
})