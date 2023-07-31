import { AiFillHome } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";
import { BsPersonCircle, BsStarFill } from "react-icons/bs";
import { BiBook } from "react-icons/bi";
import { IoMdPlanet } from "react-icons/io";
import Galaxy from "./galaxy.png";
import Rocket from "./rocket.svg";
import Telescope from "./telescope.svg";

export const links = [
    {
        title: "início",
        links: [
            {
                name: "Home",
                icon: <AiFillHome />,
                url: "",
            },
        ],
    },
    {
        title: "Crypto",
        links: [
            {
                name: "notícias",
                icon: <IoMdPlanet />,
                url: "news",
            },
            {
                name: "criptomoedas",
                icon: <FaBitcoin />,
                url: "coins",
            },
            {
                name: "moedas favoritas",
                icon: <BsStarFill />,
                url: "favorite-coins",
            },
        ],
    },
    {
        title: "Guia",
        links: [
            {
                name: "Como começar",
                icon: <BiBook />,
                url: "guide",
            },
        ],
    },
    {
        title: "perfil",
        links: [
            {
                name: "meu perfil",
                icon: <BsPersonCircle />,
                url: "profile",
            },
        ],
    },
];

function GalaxyIcon() {
    return <img src={Galaxy} alt="Galaxy" />;
}

function RocketIcon() {
    return <img src={Rocket} alt="Rocket" />;
}

function TelescopeIcon() {
    return <img src={Telescope} alt="Telescope" />;
}

export const icons = [
    {
        name: "Galaxy",
        icon: <GalaxyIcon />,
        text: "Mantenha-se atualizado sobre as últimas notícias e tendências do mundo das criptomoedas.",
        link: "news",
    },
    {
        name: "Rocket",
        icon: <RocketIcon />,
        text: "Descubra novas criptomoedas, acompanhe tendências e preços.",
        link: "coins",
    },
    {
        name: "Telescope",
        icon: <TelescopeIcon />,
        text: "Descubra como começar a investir em criptomoedas mesmo que você seja um iniciante.",
        link: "guide",
    },
];

export const container = {
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5,
        },
    },
};

export const cardsContainer = {
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const card = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "tween",
            ease: "easeOut",
        },
    },
};

export const itemA = {
    hidden: { scale: 0, top: 100 },
    show: { scale: 1, top: 30 },
};

export const navContainer = {
    visible: {
        x: 0,
        transition: {
            duration: 0.2,
        },
    },
    hidden: {
        x: -700,
        transition: {
            duration: 0.2,
        },
    },
};

export const navList = {
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.07,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

export const navItems = {
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    hidden: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
};

export const datasGrafico = [
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
];
