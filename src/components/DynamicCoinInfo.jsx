import { FormatNumber } from ".";

export default function DynamicCoinInfo(
    coin,
    currency,
    profit24h,
    profit7d,
    profit14d
) {
    const basicInfo = [
        {
            title: "Popularidade",
            content: `# ${coin?.market_cap_rank}`,
        },
        {
            title: "Capitalização de Mercado",
            content: `R$ ${FormatNumber(
                coin?.market_data.market_cap[currency.toLowerCase()]
            )}`,
        },
        {
            title: "Volume Total",
            content: `R$ ${FormatNumber(
                coin?.market_data.total_volume[currency.toLowerCase()]
            )}`,
        },
        {
            title: "Mudança de Preço (24h)",
            content: `${coin?.market_data.price_change_percentage_24h.toFixed(
                2
            )} %`,
            color: profit24h > 0 ? "#7fa2e0" : "#c7a3ff",
        },
        {
            title: "Mudança de Preço (7d)",
            content: `${coin?.market_data.price_change_percentage_7d.toFixed(
                2
            )} %`,
            color: profit7d > 0 ? "#7fa2e0" : "#c7a3ff",
        },
        {
            title: "Mudança de Preço (14d)",
            content: `${coin?.market_data.price_change_percentage_14d.toFixed(
                2
            )} %`,
            color: profit14d > 0 ? "#7fa2e0" : "#c7a3ff",
        },
        {
            title: "Quantidade total",
            content: FormatNumber(coin?.market_data.total_supply),
        },
        {
            title: "Avaliação Totalmente Diluída",
            content: `R$ ${FormatNumber(
                coin?.market_data.fully_diluted_valuation[
                    currency.toLowerCase()
                ]
            )}`,
        },
        {
            title: "Moedas em Circulação",
            content: `R$ ${FormatNumber(coin?.market_data.circulating_supply)}`,
        },
    ];

    const linksInfo = [
        {
            title: "Camada",
            content: coin?.categories[2],
        },
        {
            title: "Código fonte",
            content: "Github",
            link: coin?.links.repos_url.github[0],
        },
        {
            title: "Site oficial",
            content: coin?.links.homepage[0],
        },
        {
            title: "Comunidade",
            content: coin?.links.official_forum_url[0],
        },
        {
            title: "Reddit",
            content: coin?.links.subreddit_url,
        },
        {
            title: "Twitter",
            content: `twitter.com/${coin?.links.twitter_screen_name}`,
        },
    ];

    return {
        about: basicInfo,
        linksInfo: linksInfo,
    };
}
