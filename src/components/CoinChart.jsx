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

    const datas = [
        {
            nome: "24 Horas",
            tempo: "1",
        },
        {
            nome: "7 dias",
            tempo: "7",
        },
        {
            nome: "14 dias",
            tempo: "14",
        },
        {
            nome: "30 dias",
            tempo: "30",
        },
        {
            nome: "90 dias",
            tempo: "90",
        },
        {
            nome: "180 dias",
            tempo: "180",
        },
        {
            nome: "1 ano",
            tempo: "365",
        },
        {
            nome: "Max",
            tempo: "max",
        },
    ];

    return (
        <div className="w-full">
            <div className="flex items-center justify-center my-3 overflow-auto gap-2">
                {datas.map((btn) => (
                    <button
                        key={btn.tempo}
                        className={`border-2 py-1 px-3 rounded-md ${
                            parseInt(btn.tempo) === days
                                ? "border-violet bg-violet text-black font-semibold"
                                : "border-violet text-violet"
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
