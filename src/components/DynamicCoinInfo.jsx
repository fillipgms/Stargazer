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
            tooltip:
                "A posição desta criptomoeda em termos de capitalização de mercado.",
        },
        {
            title: "Capitalização de Mercado",
            content: `R$ ${FormatNumber(
                coin?.market_data.market_cap[currency.toLowerCase()]
            )}`,
            tooltip:
                "É a quantidade de dinheiro que custaria se você fosse comprar todas as ações emitidas de uma empresa ao preço atual de mercado. Representa o valor total da criptomoeda no mercado.",
        },
        {
            title: "Volume Total",
            content: `R$ ${FormatNumber(
                coin?.market_data.total_volume[currency.toLowerCase()]
            )}`,
            tooltip:
                "O volume total de negociação nas últimas 24 horas para esta criptomoeda.",
        },
        {
            title: "Mudança de Preço (24h)",
            content: `${coin?.market_data.price_change_percentage_24h.toFixed(
                2
            )} %`,
            color: profit24h > 0 ? "#7fa2e0" : "#c7a3ff",
            tooltip:
                "A variação percentual do preço desta criptomoeda nas últimas 24 horas. Uma mudança positiva indica um aumento de preço, enquanto uma mudança negativa indica uma queda.",
        },
        {
            title: "Mudança de Preço (7d)",
            content: `${coin?.market_data.price_change_percentage_7d.toFixed(
                2
            )} %`,
            color: profit7d > 0 ? "#7fa2e0" : "#c7a3ff",
            tooltip:
                "A variação percentual do preço desta criptomoeda nas últimas 7 dias. Uma mudança positiva indica um aumento de preço, enquanto uma mudança negativa indica uma queda.",
        },
        {
            title: "Mudança de Preço (14d)",
            content: `${coin?.market_data.price_change_percentage_14d.toFixed(
                2
            )} %`,
            color: profit14d > 0 ? "#7fa2e0" : "#c7a3ff",
            tooltip:
                "A variação percentual do preço desta criptomoeda nas últimas 14 dias. Uma mudança positiva indica um aumento de preço, enquanto uma mudança negativa indica uma queda.",
        },
        {
            title: "Quantidade total",
            content: FormatNumber(coin?.market_data.total_supply),
            tooltip:
                "O número total de unidades desta criptomoeda que estão atualmente em circulação ou disponíveis para negociação.",
        },
        {
            title: "Avaliação Totalmente Diluída",
            content: `R$ ${FormatNumber(
                coin?.market_data.fully_diluted_valuation[
                    currency.toLowerCase()
                ]
            )}`,
            tooltip:
                "Avaliação de mercado considerando a oferta totalmente diluída, levando em conta todas as possíveis unidades desta criptomoeda que podem ser criadas no futuro.",
        },
        {
            title: "Moedas em Circulação",
            content: `R$ ${FormatNumber(coin?.market_data.circulating_supply)}`,
            tooltip:
                "O número de unidades desta criptomoeda atualmente em circulação no mercado.",
        },
    ];

    const linksInfo = [
        {
            title: "Camada",
            content: coin?.categories[2],
            tooltip:
                "A categoria ou camada em que esta criptomoeda se encaixa, por exemplo, DeFi, NFTs, etc.",
        },
        {
            title: "Código fonte",
            content: "Github",
            link: coin?.links.repos_url.github[1],
            tooltip:
                "O link para o repositório GitHub onde você pode encontrar o código-fonte desta criptomoeda.",
        },
        {
            title: "Site oficial",
            content: coin?.links.homepage[0],
            tooltip:
                "O link para o site oficial desta criptomoeda, onde você pode obter mais informações sobre ela.",
        },
        {
            title: "Comunidade",
            content: coin?.links.official_forum_url[0],
            tooltip:
                "O link para o fórum oficial ou comunidade online associada a esta criptomoeda.",
        },
        {
            title: "Reddit",
            content: coin?.links.subreddit_url,
            tooltip:
                "O link para a página do Reddit dedicada a discussões sobre esta criptomoeda.",
        },
        {
            title: "Twitter",
            content: `twitter.com/${coin?.links.twitter_screen_name}`,
            tooltip:
                "O link para a conta oficial no Twitter relacionada a esta criptomoeda.",
        },
    ];

    return {
        about: basicInfo,
        linksInfo: linksInfo,
    };
}
