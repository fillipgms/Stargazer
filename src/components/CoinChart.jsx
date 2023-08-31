import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { HistoricalChart } from "../services/coinGeckoApi";

import { Loading } from "../components";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment/moment";

import { datasGrafico } from "../data/dummy";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const CoinChart = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);

    const { currency } = useStateContext();

    const fetchHistoricData = async () => {
        const { data } = await axios.get(
            HistoricalChart(coin.id, days, currency)
        );

        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricData();
    }, [currency, days]);

    if (!historicData) {
        return <Loading />;
    }

    const coinChartData = historicData.map((value) => ({
        x: value[0],
        y: value[1], // Use o preço da moeda (posição 1 do array 'value')
    }));

    const options = {
        responsive: true,
    };

    const data = {
        labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
        datasets: [
            {
                fill: false,
                label: coin.name,
                data: coinChartData.map((val) => val.y),
                borderColor: "#f788b6",
            },
        ],
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-center my-3 overflow-auto gap-2">
                {datasGrafico.map((btn) => (
                    <button
                        key={btn.tempo}
                        className={`border-2 py-1 px-3 rounded-md ${
                            parseInt(btn.tempo) === days
                                ? "border-pink bg-pink text-black font-semibold"
                                : "border-pink text-pink"
                        }`}
                        onClick={() => setDays(parseInt(btn.tempo))}
                    >
                        {btn.nome}
                    </button>
                ))}
            </div>
            <Line options={options} data={data} />
        </div>
    );
};

export default CoinChart;
