import React, { useContext, useEffect, useMemo } from "react";
import NavBar from "../NavBar";
import { cookingContext } from "../Context/Context";
import useFetchHook from "../../P13/useFetchHook";
import Style from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
    const { search } = useContext(cookingContext);

    const option = useMemo(() => ({}), []);

    const { data, isLoading, errorMsg } = useFetchHook({
        url: `https://forkify-api.herokuapp.com/api/search?q=${search}`,
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
                <>
                    {console.log(data)}
                    <h2 style={{ textAlign: "center" }}>
                        Number of Results: {data.count}
                    </h2>

                    <div className={Style.items}>
                        {data.recipes.map((item) => (
                            <Link
                                key={item.recipe_id}
                                to={`/React-25-Project-Course/cooking-site/details/${item.recipe_id}`}
                            >
                                <div
                                    href={item.source_url}
                                    className={Style.card}
                                >
                                    <img
                                        src={item.image_url}
                                        alt="item image"
                                    />
                                    <div style={{ padding: " 5px 10px" }}>
                                        <div><b>{item.title}</b></div>
                                        <br />
                                        <div>
                                            Publisher:{" "}
                                            <a
                                                href={item.source_url}
                                                target="_blank"
                                            >
                                                {item.publisher}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
