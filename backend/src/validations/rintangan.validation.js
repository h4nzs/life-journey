import { z } from 'zod';

export const rintanganSchema = z.object({
  body: z.object({
    jenis_rintangan: z
      .string({ required_error: 'Jenis rintangan is required' })
      .min(3, 'Jenis rintangan must be at least 3 characters long'),
  }),
});

export const updateRintanganSchema = z.object({
    body: z.object({
        jenis_rintangan: z.string().min(3, 'Jenis rintangan must be at least 3 characters long').optional(),
      }),
})