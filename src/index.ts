import readline from "node:readline";
import { InMemorySessionService, Runner } from "@iqai/adk";
import { cryptoAgent } from "./agent";

async function main() {
	const appName = "crypto-ai-agent";
	const userId = "user-1";
	const sessionService = new InMemorySessionService();
	const session = await sessionService.createSession(appName, userId);
	// console.log("Session created:", session.id);
	const runner = new Runner({ appName, agent: cryptoAgent, sessionService });

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "You: ",
	});

	console.log(
		"Ask your crypto question (e.g. 'What is the price of solana or the latest crypto news?'). Type 'exit' to quit.",
	);
	rl.prompt();

	rl.on("line", async (userInput) => {
		const query = userInput.trim();
		if (query.toLowerCase() === "exit" || query.toLowerCase() === "quit") {
			rl.close();
			return;
		}
		try {
			for await (const event of runner.runAsync({
				userId,
				sessionId: session.id,
				newMessage: {
					role: "user",
					parts: [{ text: query }],
				},
			})) {
				// console.log("EVENT:", JSON.stringify(event, null, 2));

				if (event.author === "crypto_agent" && event.content?.parts) {
					for (const part of event.content.parts) {
						if (part.text) {
							console.log("Response🤖:", part.text);
						}
						if (part.functionResponse) {
							console.log("🔎 Tool Result:", part.functionResponse.response);
							break;
						}
						if (part.functionCall) {
							part.functionCall;
						}
					}
				}
			}
		} catch (err) {
			console.error("Error running agent:", err);
		}
		rl.prompt();
	});

	rl.on("close", () => {
		console.log("Goodbye!");
		process.exit(0);
	});
}

main().catch((err) => {
	console.error("Error running agent:", err);
});
