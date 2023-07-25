import React, { useState, useEffect } from "react";

const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <nav className="md:w-full bg-dark-bg px-3 py-2 text-white rounded-md">
            <ul className="flex justify-between items-center">
                <li>
                    <button
                        className="disabled:opacity-20"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                </li>
                {pageNumbers.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={` ${
                            pageNumber === currentPage ? "active" : ""
                        }`}
                    >
                        <button
                            className={`py-3 px-5 rounded-full ${
                                pageNumber === currentPage
                                    ? "bg-pink text-white"
                                    : ""
                            }`}
                            onClick={() => onPageChange(pageNumber)}
                            disabled={pageNumber === currentPage}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        className="disabled:opacity-20"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Posterior
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
