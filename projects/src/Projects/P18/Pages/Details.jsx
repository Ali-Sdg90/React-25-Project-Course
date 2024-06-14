import React, { useMemo } from "react";
import NavBar from "../NavBar";
import { useParams } from "react-router-dom";
import useFetchHook from "../../P13/useFetchHook";

import Style from "./Details.module.css";

const Details = () => {
    const { id } = useParams();

    const option = useMemo(() => ({}), []);

    const { data, isLoading, errorMsg } = useFetchHook({
        url: `https://forkify-api.herokuapp.com/api/get?rId=${id}`,
        options: option,
    });

    return (
        <div className={Style.container}>
            <NavBar />

            {isLoading ? (
                <h1>Loading...</h1>
            ) : errorMsg ? (
                <h1>Error: {errorMsg}</h1>
            ) : (
                <div className={Style.recipe}>
                    {console.log(data)}

                    <h1>{data.recipe.title}</h1>
                    <img src={data.recipe.image_url} alt="item image" />

                    <h4>
                        Publisher:{" "}
                        <a href={data.recipe.source_url} target="_blank">
                            {data.recipe.publisher}
                        </a>
                    </h4>

                    <hr style={{ width: "100%" }} />

                    <div>
                        <h2>Ingredients:</h2>

                        <ol>
                            {data.recipe.ingredients.map((item) => (
                                <li>{item}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
