import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(180).toLowerCase(),
    password: z.string().min(12).max(128),
    role: z.enum(["ADMIN", "USER"]).default("USER")
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email().max(180).toLowerCase(),
    password: z.string().min(1).max(128)
  })
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(40).max(300)
  })
});
