# Crypto AI Agent

A conversational AI agent for cryptocurrency insights, powered by [`@iqai/adk`](https://github.com/IQAICOM/adk-ts). This agent can answer crypto-related questions, fetch a coin/token price, market cap, volume or category and retrieve the latest news from Coindesk directly from your terminal.

## Features

- **Conversational CLI**: Ask multiple questions in a single session without need to restart the process.
- **Crypto Data Queries**: Get real-time prices, market cap, category and volume for cryptocurrencies/tokens.
- **Crypto News**: Fetch the latest news or specific number of articles from [Coindesk](https://coindesk.com).

## Development Tools

- **Husky**: Git hooks for code quality
- **Biome**: Linting and formatting
- **GitHub Actions**: CI/CD pipeline
- **PNPM**: Fast package manager

## Get Started

### Prerequisites

- Node.js 18+ and PNPM installed
- LLM Model API Key (e.g GPT, Gemini, Claude, etc)
- [Coingecko API Key](https://www.coingecko.com/en/developers)
- [Coindesk API Key](https://developers.coindesk.com/documentation/data-api/introduction)

Clone the repository:

```bash
git clone https://github.com/frankiefab100/crypto-ai-agent.git
cd crypto-ai-agent
```

Install dependencies:

```bash
pnpm install
```

Run the agent:

```bash
export GOOGLE_API_KEY=your-llm-model-api-key
npx tsx src/index.ts
```

## Environment Variables Setup

Create a `.env` file in the project root and fill in your credentials:

```env
LLM_MODEL=                 # The language model (e.g., `gemini-2.5-flash`)
GOOGLE_API_KEY=            # Gemini LLM Model API key
COINGECKO_API_KEY=         # Coingecko Demo plan API key
COINDESK_API_KEY=          # Coindesk Data API key
```

## Folder Structure

The main agent code lives in `src/index.ts`. Agents and their tools are organized as follows:

```
├── src/
│   ├── crypto-agent/
│   │       ├── index.ts
│   │       └── tools/
│   │           ├── crypto-data-tool.ts
│   │           └── coindesk-news-tool.ts
│   ├── lib/
|   ├── env.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   └── index.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](./LICENSE) .

## Resources

- [ADK Typescript](https://github.com/IQAICOM/adk-ts)
- [Coingecko Public API](https://docs.coingecko.com/v3.0.1/reference)
- [Coindesk Data API Docs](https://developers.coindesk.com/documentation/data-api/introduction)
