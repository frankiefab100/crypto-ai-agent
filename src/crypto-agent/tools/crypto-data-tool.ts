import { BaseTool, type ToolContext } from "@iqai/adk";
import type { FunctionDeclaration } from "@iqai/adk";
import type { CoinGeckoCoinResponse } from "../../lib/types";

export class CryptoDataTool extends BaseTool {
	constructor() {
		super({
			name: "fetch_crypto_data",
			description:
				"A crypto agent that fetches real-time crypto data. For any user input that is a cryptocurrency name or symbol (like 'solana' or SOL), use the fetch_crypto_data tool and pass the token name as the 'token' argument. If the user input is ambiguous or not a token, ask for clarification.",
		});
	}

	getDeclaration(): FunctionDeclaration {
		return {
			name: this.name,
			description: this.description,
			parameters: {
				type: "object",
				properties: {
					token: {
						type: "string",
						description: "The token id (e.g. 'bitcoin', 'ethereum', 'solana')",
					},
				},
				required: ["token"],
			},
		};
	}

	async runAsync(args: { token: string }, context: ToolContext) {
		const symbolToId: Record<string, string> = {
			btc: "bitcoin",
			sol: "solana",
			eth: "ethereum",
		};

		const input = (args.token || "").toLowerCase();
		const tokenId = symbolToId[input] || input;
		const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(tokenId)}`;

		try {
			const res = await fetch(url, {
				method: "GET",
				headers: { Accept: "application/json" },
			});
			if (!res.ok) {
				return {
					error: `CoinGecko API error: ${res.status} ${res.statusText}`,
				};
			}
			const data = (await res.json()) as CoinGeckoCoinResponse;

			const marketData = data.market_data || {};
			return {
				name: data.name,
				symbol: data.symbol,
				price_usd: marketData.current_price?.usd,
				market_cap_usd: marketData.market_cap?.usd,
				volume_usd: marketData.total_volume?.usd,
				categories: data.categories,
				last_updated: data.last_updated,
				coingecko_url: data.links?.homepage?.[0],
			};
		} catch (err) {
			return { error: `Failed to fetch data: ${err}` };
		}
	}
}
