import { z } from "zod";
import path from "path"
import dotenv from "dotenv"
dotenv.config({
    path: path.resolve(process.cwd(), '.env') 
});

const envSchema = z.object({
    PORT: z.string(),
    DATABASE_URL: z.string().min(1),
    WEBHOOK_SECRET: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    CLERK_JWT_KEY: z.string().min(1)
});

const parsedEnv = envSchema.parse(process.env);

export const PORT= parsedEnv.PORT
export const DATABASE_URL = parsedEnv.DATABASE_URL;
export const WEBHOOK_SECRET = parsedEnv.WEBHOOK_SECRET;
export const CLOUDINARY_API_KEY=parsedEnv.CLOUDINARY_API_KEY;
export const CLOUDINARY_CLOUD_NAME=parsedEnv.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_SECRET=parsedEnv.CLOUDINARY_API_SECRET;
export const CLERK_JWT_KEY=parsedEnv.CLERK_JWT_KEY

