export const CoinList = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=pt`;

export const SingleCoin = (id) =>
    `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`;

export const TopThreeCoins = () =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=BRL&order=gecko_desc&per_page=3&page=1&sparkline=false&price_change_percentage=24h`;
