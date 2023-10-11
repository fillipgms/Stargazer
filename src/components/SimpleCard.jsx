import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const SimpleCard = ({ titulo, tooltip, conteudo, color }) => {
    if (!conteudo) return null;

    return (
        <div
            className="py-2 px-5 bg-dark-bg rounded-md tooltip text-left"
            data-tip={tooltip}
        >
            <h3 className="flex items-center gap-1">
                {titulo}
                <AiOutlineInfoCircle />
            </h3>
            <span
                style={
                    color
                        ? {
                              color: color,
                              fontWeight: 500,
                              borderColor: color,
                          }
                        : {}
                }
            >
                {conteudo}
            </span>
        </div>
    );
};

export default SimpleCard;
