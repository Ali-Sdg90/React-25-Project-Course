import React, { useEffect, useState } from "react";
import Style from "./P5.module.css";

const BASE_URL = "https://rickandmortyapi.com/api/character/?page=";

const P5 = () => {
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);

    const getData = async (pageNO) => {
        let isDuplicate = false;

        data.forEach((item) => {
            if (item.key === pageNO) {
                isDuplicate = true;
            }
        });

        console.log(isDuplicate);

        if (!isDuplicate) {
            const response = await fetch(BASE_URL + pageNO);

            const data = await response.json();

            setNumberOfPages(data.info.pages);

            const results = data.results;

            const charactersData = results.map((result) => {
                return {
                    name: result.name,
                    image: result.image,
                };
            });

            setData((prevState) => {
                return [
                    ...prevState,
                    {
                        key: pageNO,
                        data: charactersData,
                    },
                ];
            });

            setPageData(charactersData);
        } else {
            // console.log("STORED!");

            data.forEach((item) => {
                if (item.key === pageNO) {
                    setPageData(item.data);
                }
            });
        }
    };

    useEffect(() => {
        getData(pageNumber);
    }, [pageNumber]);

    return (
        <div className={Style.container}>
            {data.length ? (
                <div className={Style.chars}>
                    {pageData.map((char, index) => {
                        return (
                            <div key={index} className={Style.char}>
                                <img src={char.image} width="55" />
                                <div className={Style.name}>{char.name}</div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <h1>Loading...</h1>
            )}

            <div className={Style.navBtns}>
                <button
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber((prevState) => prevState - 1)}
                >
                    &lt;
                </button>
                <div>
                    Page {pageNumber} / {numberOfPages}
                </div>
                <button
                    disabled={pageNumber === numberOfPages - 1}
                    onClick={() => setPageNumber((prevState) => prevState + 1)}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default P5;
