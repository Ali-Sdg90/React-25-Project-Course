import React, { useMemo } from "react";
import Style from "./P13.module.css";
import useFetchHook from "./useFetchHook.jsx";

const P13 = () => {
    const options = useMemo(() => ({}), []);
    const { data, isLoading, errorMsg } = useFetchHook({
        url: "https://rickandmortyapi.com/api/character",
        options,
    });

    return (
        <div className={Style.container}>
            {isLoading && <p>Loading...</p>}
            {errorMsg && <p>{errorMsg}</p>}
            {data && (
                <>
                    <h2 className={Style.header}>useFetchHook</h2>
                    <div>
                        {data.results.map((character, index) => (
                            <span key={character.id}>
                                {character.name} {index !== 19 && " - "}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default P13;
