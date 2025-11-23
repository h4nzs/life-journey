import { z } from 'zod';

export const emosiSchema = z.object({
  body: z.object({
    jenis_emosi: z
      .string({ required_error: 'Jenis emosi is required' })
      .min(3, 'Jenis emosi must be at least 3 characters long'),
  }),
});

export const updateEmosiSchema = z.object({
    body: z.object({
        jenis_emosi: z.string().min(3, 'Jenis emosi must be at least 3 characters long').optional(),
      }),
})