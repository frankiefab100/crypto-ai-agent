export const formatDate = (timestamp?: number) =>
	timestamp ? new Date(timestamp * 1000).toLocaleString() : "N/A";
