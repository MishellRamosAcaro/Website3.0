import { z } from 'zod'

const strongPassword = z
  .string()
  .min(9, 'Password must be at least 9 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    'Password must contain at least one special character'
  )

export const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(9, 'Password must be at least 9 characters'),
  honeypot: z.string().max(0, 'Invalid submission'),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

export const registerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must be less than 100 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: strongPassword,
  honeypot: z.string().max(0, 'Invalid submission'),
})

export type RegisterFormData = z.infer<typeof registerFormSchema>
