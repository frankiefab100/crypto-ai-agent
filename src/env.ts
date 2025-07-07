import { config } from "dotenv";
import { z } from "zod";
config();

export const envSchema = z.object({
	DEBUG: z.string().default("false"),
	GOOGLE_API_KEY: z.string(),
	LLM_MODEL: z.string(),
	COINGECKO_API_KEY: z.string(),
	COINDESK_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
