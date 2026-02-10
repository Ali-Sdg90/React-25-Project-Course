import React, { useMemo, useState } from "react";
import Style from "./P17.module.css";
import useFetchHook from "../P13/useFetchHook";
import ShowMap from "./ShowMap";

const APIKey = "37f09742e770af9ecf339b9134821cd1";

const P17 = () => {
    const option = useMemo(() => ({}), []);

    const [search, setSearch] = useState("Tehran");

    const { data, isLoading, errorMsg } = useFetchHook({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIKey}`,
        options: option,
    });

    return (
        <div className={Style.container}>
            <div className={Style.leftSection}>
                <div className={Style.inputSection}>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="City Name"
                    />

                    <div>
                        <button onClick={() => setSearch("Tehran")}>
                            Tehran
                        </button>
                        <button onClick={() => setSearch("New York")}>
                            New York
                        </button>
                        <button onClick={() => setSearch("Paris")}>
                            Paris
                        </button>
                        <button onClick={() => setSearch("Berlin")}>
                            Berlin
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <h1>Loading...</h1>
                ) : errorMsg ? (
                    <h1>Error: {errorMsg}</h1>
                ) : (
                    <div className={Style.weatherInfo}>
                        <h1>
                            {data.sys.country} {" - "}
                            {data.name}
                        </h1>
                        <div>
                            {Object.entries(data.main).map(([key, value]) => (
                                <div key={key}>
                                    {key}:{" "}
                                    {value > 200 && value < 500
                                        ? (value - 273.15).toFixed(2) + "°C"
                                        : value}
                                </div>
                            ))}
                            {Object.entries(data.wind).map(([key, value]) => (
                                <div key={key}>
                                    {key}
                                    {": "}
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className={Style.rightSection}>
                {!isLoading && data && data.coord.lon && data.coord.lat ? (
                    <ShowMap lon={data.coord.lon} lat={data.coord.lat} />
                ) : null}
            </div>
        </div>
    );
};

export default P17;
