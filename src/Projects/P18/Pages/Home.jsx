import React, { useContext, useEffect, useMemo, useState } from "react";
import NavBar from "../NavBar";
import { cookingContext } from "../Context/Context";
import useFetchHook from "../../P13/useFetchHook";
import Style from "./Home.module.css";
import { appContext } from "../../../Context/AppContext";
import Card from "./Card";

const Home = () => {
    const { search } = useContext(cookingContext);

    const { cookingData, setCookingData } = useContext(appContext);

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
    }, [
        dataFetched,
        isLoadingFetched,
        errorMsgFetched,
        cookingData,
        setCookingData,
    ]);

    useEffect(() => {
        // console.log("cookingData", cookingData);
    }, [cookingData]);

    return (
        <div className={Style.container}>
            <NavBar navMode={"Home"} />

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

                        {siteData.data.recipes.map((item, index) => (
                            <Card key={index} item={item} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
