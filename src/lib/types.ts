export type CoinGeckoCoinResponse = {
	name: string;
	symbol: string;
	market_data?: {
		current_price?: { usd?: number };
		market_cap?: { usd?: number };
		total_volume?: { usd?: number };
	};
	categories?: string[];
	last_updated?: string;
	links?: {
		homepage?: string[];
	};
};

export type NewsItem = {
	TYPE: string;
	ID: number;
	GUID: string;
	PUBLISHED_ON: number;
	PUBLISHED_ON_NS?: number | null;
	IMAGE_URL?: string;
	TITLE: string;
	SUBTITLE?: string | null;
	AUTHORS?: string;
	URL: string;
	SOURCE_ID?: number;
	BODY?: string;
};

export type CoindeskApiResponse = {
	Data: NewsItem[];
};
