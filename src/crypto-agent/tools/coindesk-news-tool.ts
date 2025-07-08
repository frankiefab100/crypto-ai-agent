import { writeFile } from "node:fs/promises";
import { BaseTool, type ToolContext } from "@iqai/adk";
import type { FunctionDeclaration } from "@iqai/adk";
import * as dotenv from "dotenv";
import type { CoindeskApiResponse, NewsItem } from "../../lib/types";
import { formatDate } from "../../lib/utils";
dotenv.config();

export class CoindeskNewsTool extends BaseTool {
	constructor() {
		super({
			name: "fetch_coindesk_news",
			description:
				"Fetches the latest news from Coindesk using the Coindesk News API. Processes and formats the news items. Writes the output to a news.md file.",
		});
	}

	getDeclaration(): FunctionDeclaration {
		return {
			name: this.name,
			description: this.description,
			parameters: {
				type: "object",
				properties: {
					count: {
						type: "integer",
						description: "Number of news items to return (default 5, max 10).",
					},
				},
				required: [],
			},
		};
	}

	async runAsync(args: { count?: number }, _context: ToolContext) {
		const apiUrl =
			"https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=10";
		try {
			const res = await fetch(apiUrl, {
				headers: {
					method: "GET",
					Accept: "application/json",
					Authorization: `Bearer ${process.env.COINDESK_API_KEY}`,
				},
			});
			if (!res.ok) {
				return {
					error: `Coindesk News API error: ${res.status} ${res.statusText}`,
				};
			}

			const data = (await res.json()) as CoindeskApiResponse;
			if (!data || !Array.isArray(data.Data)) {
				return { error: "Unexpected API response: missing Data array." };
			}
			const newsReport: NewsItem[] = data.Data;

			const count = Math.max(1, Math.min(args.count ?? 5, 10));
			const topNews = newsReport.slice(0, count);
			const formatted = topNews
				.map(
					(item, i) =>
						`## ${i + 1}. [${item.TITLE}](${item.URL})\n ### Date: ${formatDate(item.PUBLISHED_ON)}\n #### Summary:\n ${item.BODY || "N/A"}`,
				)
				.join("\n\n");

			const newsFileTitle = `# Coindesk Latest News\n\n${formatted}\n`;
			await writeFile(`${__dirname}/news.md`, newsFileTitle, "utf-8");

			return {
				message: `Wrote top ${topNews.length} Coindesk news items to news.md.`,
				newsPath: `${__dirname}/news.md`,
				items: topNews,
			};
		} catch (err) {
			return { error: `Failed to fetch or write news: ${err}` };
		}
	}
}
