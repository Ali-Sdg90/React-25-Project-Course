import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../NavBar";
import { cookingContext } from "../Context/Context";
import useFetchHook from "../../P13/useFetchHook";
import Style from "./Home.module.css";
import { Link } from "react-router-dom";
import { appContext } from "../../../Context/AppContext";

const Home = () => {
    const { search } = useContext(cookingContext);

    const { cookingData, setCookingData } = useContext(appContext);

    const option = useMemo(() => ({}), []);

    const [siteData, setSiteData] = useState({
        data:  "",
        isLoading: true,
        errorMsg: "",
    });

    const {
        data: dataFetched,
        isLoading: isLoadingFetched,
        errorMsg: errorMsgFetched,
    } = useFetchHook({
        url: `https://forkify-api.herokuapp.com/api/search?q=${search}`,
        options: option,
    });

    const getBase64Image = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    };

    useEffect(() => {
        console.log("cookingData", cookingData);

        if (cookingData) {
            console.log("STORED!");

            setSiteData({
                data: cookingData,
                isLoading: false,
                errorMsg: "",
            });
        } else {
            console.log("FETCHED!");

            if (dataFetched) {
                console.log("dataFetched", dataFetched);

                console.log("recipes", dataFetched.recipes);

                const fetchImages = async () => {
                    const dataFetchedWithBase64Images = await Promise.all(
                        dataFetched.recipes.map(async (item) => {
                            const base64Image = await getBase64Image(
                                item.image_url
                            );
                            return {
                                ...item,
                                image_url: base64Image,
                            };
                        })
                    );

                    setSiteData({
                        data: dataFetchedWithBase64Images,
                        isLoading: isLoadingFetched,
                        errorMsg: errorMsgFetched,
                    });

                    setCookingData(dataFetchedWithBase64Images);
                };

                fetchImages();
            }
        }
    }, [dataFetched, isLoadingFetched, errorMsgFetched]);

    return (
        <div className={Style.container}>
            <NavBar />

            {siteData.isLoading ? (
                <h1>Loading...</h1>
            ) : siteData.errorMsg ? (
                <h1>Error: {siteData.errorMsg}</h1>
            ) : (
                <>
                    <h2 style={{ textAlign: "center" }}>
                        Number of Results: {siteData.data.length}
                    </h2>

                    <div className={Style.items}>
                        {console.log("=======>", siteData.data)}
                        {siteData.data.map((item) => (
                            <Link
                                key={item.recipe_id}
                                to={`/React-25-Project-Course/cooking-site/details/${item.recipe_id}`}
                            >
                                <div className={Style.card}>
                                    <img
                                        src={item.image_url}
                                        alt="item image"
                                    />
                                    <div style={{ padding: " 5px 10px" }}>
                                        <div>
                                            <b>{item.title}</b>
                                        </div>
                                        <br />
                                        <div>
                                            Publisher:{" "}
                                            <a
                                                href={item.source_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
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
