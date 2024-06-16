import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../NavBar";
import { cookingContext } from "../Context/Context";
import useFetchHook from "../../P13/useFetchHook";
import Style from "./Home.module.css";
import { Link } from "react-router-dom";
import { appContext } from "../../../Context/AppContext";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Home = () => {
    const { search } = useContext(cookingContext);

    const { cookingData, setCookingData, favRecipe, setFavRecipe } =
        useContext(appContext);

    const option = useMemo(() => ({}), []);

    const [siteData, setSiteData] = useState({
        data: "",
        isLoading: true,
        errorMsg: "",
    });

    const [isSavingImageDone, setIsSavingImageDone] = useState(false);

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
        if (dataFetched) {
            console.log("dataFetched", dataFetched);

            setSiteData({
                data: dataFetched,
                isLoading: isLoadingFetched,
                errorMsg: errorMsgFetched,
            });

            const output = {};
            setIsSavingImageDone(false);

            const fetchImages = async () => {
                await Promise.all(
                    dataFetched.recipes.map(async (item) => {
                        if (cookingData && !cookingData[item.recipe_id]) {
                            const base64Image = await getBase64Image(
                                item.image_url
                            );

                            output[item.recipe_id] = base64Image;
                        }
                    })
                );

                setCookingData((prevState) => ({
                    ...prevState,
                    ...output,
                }));

                console.log("DONE CREATE LOCAL IMAGE-OBJ");
                setIsSavingImageDone(true);
            };

            fetchImages();
        }
        // }
    }, [dataFetched, isLoadingFetched, errorMsgFetched]);

    const starClickHandler = (item) => {
        // const index = Object.keys(favRecipe).indexOf(item.recipe_id);

        if (!(item.recipe_id in favRecipe)) {
            setFavRecipe((prevState) => ({
                ...prevState,
                [item.recipe_id]: item,
            }));
        } else {
            const newFavRecipe = JSON.parse(JSON.stringify(favRecipe));

            delete newFavRecipe[item.recipe_id];
            setFavRecipe(newFavRecipe);
        }
    };

    const preventDefaultBehaviorOfLink = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    useEffect(() => {
        console.log("favRecipe", favRecipe);
    }, [favRecipe]);

    useEffect(() => {
        // console.log("cookingData", cookingData);
    }, [cookingData]);

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
                        Number of Results: {siteData.data.count}
                        <div
                            className={`${Style.imageSaved} ${
                                isSavingImageDone ? Style.done : Style.loading
                            }`}
                        >
                            Images Saved:{" "}
                            {cookingData
                                ? Object.keys(cookingData).length
                                : "0"}
                            /
                            {(cookingData
                                ? Object.keys(cookingData).length
                                : 0) +
                                (isSavingImageDone ? 0 : siteData.data.count)}
                        </div>
                    </h2>

                    <div className={Style.items}>
                        {console.log("=======>", siteData.data)}
                        {siteData.data.recipes.map((item) => (
                            <Link
                                key={item.recipe_id}
                                to={`/React-25-Project-Course/cooking-site/details/${item.recipe_id}`}
                            >
                                <div className={Style.card}>
                                    {/* {console.log(cookingData[item.recipe_id])} */}
                                    <img
                                        src={
                                            cookingData &&
                                            cookingData[item.recipe_id]
                                                ? (() => {
                                                      console.log("SAVED");
                                                      return cookingData[
                                                          item.recipe_id
                                                      ];
                                                  })()
                                                : (() => {
                                                      console.log("FETCHED");
                                                      return item.image_url;
                                                  })()
                                        }
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
                                                onClick={(event) =>
                                                    preventDefaultBehaviorOfLink(
                                                        event
                                                    )
                                                }
                                            >
                                                {item.publisher}
                                            </a>
                                        </div>
                                    </div>
                                    {Object.keys(favRecipe).includes(
                                        item.recipe_id
                                    ) ? (
                                        <FaStar
                                            className={`${Style.star} ${Style.starYellow}`}
                                            onClick={(event) => {
                                                preventDefaultBehaviorOfLink(
                                                    event
                                                );
                                                starClickHandler(item);
                                            }}
                                        />
                                    ) : (
                                        <CiStar
                                            className={`${Style.star} ${Style.starBlack}`}
                                            onClick={(event) => {
                                                preventDefaultBehaviorOfLink(
                                                    event
                                                );
                                                starClickHandler(item);
                                            }}
                                        />
                                    )}
                                    {/* <FaStar
                                        className={`${Style.star} ${Style.starYellow}`}
                                        onClick={(event) => {
                                            preventDefaultBehaviorOfLink(event);
                                            starClickHandler(item);
                                        }}
                                    /> */}
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
