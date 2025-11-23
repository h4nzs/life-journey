import { z } from 'zod';

export const tujuanSchema = z.object({
  body: z.object({
    jenis_tujuan: z
      .string({ required_error: 'Jenis tujuan is required' })
      .min(3, 'Jenis tujuan must be at least 3 characters long'),
    hasil: z.string().optional(),
  }),
});

export const updateTujuanSchema = z.object({
    body: z.object({
        jenis_tujuan: z.string().min(3, 'Jenis tujuan must be at least 3 characters long').optional(),
        hasil: z.string().optional(),
      }),
})