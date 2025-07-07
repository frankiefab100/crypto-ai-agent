import readline from "node:readline";
import { InMemorySessionService, Runner } from "@iqai/adk";
import { cryptoAgent } from "./crypto-agent";

async function main() {
	const appName = "crypto-ai-agent";
	const userId = "user-1";
	const sessionService = new InMemorySessionService();
	const session = await sessionService.createSession(appName, userId);
	// console.log("Session created:", session.id);
	const runner = new Runner({ appName, agent: cryptoAgent, sessionService });

	// Interactive prompt for user input
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question(
		"Ask your crypto question (e.g. 'What is the price of solana?'): ",
		async (userInput) => {
			rl.close();
			const query = userInput?.trim()
				? userInput.trim()
				: "What is the price of solana?";
			console.log(`\n📝 Query: ${query}\n`);

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
								console.log("🤖 Response:", part.text);
							}
							if (part.functionResponse) {
								console.log("🔎 Tool Result:", part.functionResponse.response);
								break;
							}
							if (part.functionCall) {
								console.log("🔧 Tool Call (pending):", part.functionCall);
							}
						}
					}
				}
			} catch (err) {
				console.error("Error running agent:", err);
			}
		},
	);
}

main().catch((err) => {
	console.error("Error running agent:", err);
});
