import { Agent } from "@iqai/adk";
import * as dotenv from "dotenv";
import { FetchCoindeskNewsTool } from "./tools/coindesk-news-tool";
import { FetchCryptoDataTool } from "./tools/crypto-data-tool";
dotenv.config();

export const cryptoAgent = new Agent({
	name: "crypto_agent",
	model: process.env.LLM_MODEL || "gemini-2.5-flash",
	description:
		"A crypto agent that fetches real-time crypto data. For any user input that is a cryptocurrency name or symbol (like 'solana' or SOL), use the fetch_crypto_data tool and pass the token name as the 'token' argument. If the user input is ambiguous or not a token, ask for clarification.",
	instruction:
		"Use the fetch_crypto_data tool to answer crypto price and market questions.",
	tools: [new FetchCryptoDataTool(), new FetchCoindeskNewsTool()],
});
