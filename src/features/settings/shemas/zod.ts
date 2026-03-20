import { z } from 'zod'

export const schema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z
        .string()
        .min(1)
        .email(),
  emailConfirm: z
        .string()
        .min(1)
        .email(),
  })
  .refine((data) => data.email === data.emailConfirm, {
      message: 'bad',
      path: ['emailConfirm'],
  })