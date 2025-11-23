import { z } from 'zod';

export const updateTokohSchema = z.object({
  body: z.object({
    tekad: z.string().optional(),
    keimanan: z.string().optional(),
    kondisi_jiwa: z.string().optional(),
  }),
});