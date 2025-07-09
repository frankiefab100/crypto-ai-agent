import { Agent } from "@iqai/adk";
import * as dotenv from "dotenv";
import { CoindeskNewsTool } from "./tools/coindesk-news-tool";
import { CryptoDataTool } from "./tools/crypto-data-tool";
dotenv.config();

export const cryptoAgent = new Agent({
	name: "crypto_agent",
	model: process.env.LLM_MODEL || "gemini-2.5-flash",
	description:
		"A crypto agent that fetches real-time crypto data and news updates. For any user input that is a cryptocurrency name or symbol (like 'solana' or SOL), use the fetch_crypto_data tool and pass the token name as the 'token' argument. For news or updates, use the fetch_coindesk_news tool to retrieve and deliver the latest curated news articles from CoinDesk. Always provide concise, specific answers based on the user's request.",
	instruction:
		"Always provide a direct and specific answer to the user's question. If the user asks for the price, return only the current price. If the user asks for market cap, volume, or other data, return only that information. For news requests, return only the news articles or details requested. Use the fetch_crypto_data tool for price and market data, and the fetch_coindesk_news tool for news. Do not include extra information unless explicitly asked.",
	tools: [new CryptoDataTool(), new CoindeskNewsTool()],
});
