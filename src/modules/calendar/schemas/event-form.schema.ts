import * as z from 'zod';

export const eventFormSchema = z.object({
  title: z
    .string({
      required_error: 'Field is required',
    })
    .min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string(),
  beginTime: z.string(),
  createdAt: z.coerce
    .date({
      required_error: 'Field is required',
    })
    .refine((value) => value !== null && value !== undefined, {
      message: 'Field is required',
    }),
});

export type EventFormSchemaType = z.infer<typeof eventFormSchema>;
