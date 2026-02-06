import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z
    .string()
    .min(2, 'Company must be at least 2 characters')
    .max(100, 'Company must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  honeypot: z.string().max(0, 'Invalid submission'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
