import React, { useContext, useMemo } from "react";
import NavBar from "../NavBar";
import { useParams } from "react-router-dom";
import useFetchHook from "../../P13/useFetchHook";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import Style from "./Details.module.css";
import { appContext } from "../../../Context/AppContext";

const Details = () => {
    const { id } = useParams();

    const { cookingData, favRecipe, setFavRecipe } = useContext(appContext);

    const option = useMemo(() => ({}), []);

    const { data, isLoading, errorMsg } = useFetchHook({
        url: `https://forkify-api.herokuapp.com/api/get?rId=${id}`,
        options: option,
    });

    const preventDefaultBehaviorOfLink = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

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

    return (
        <div className={Style.container}>
            <NavBar navMode={"details"} />

            {isLoading ? (
                <h1>Loading...</h1>
            ) : errorMsg ? (
                <h1>Error: {errorMsg}</h1>
            ) : (
                <div className={Style.recipe}>
                    {console.log(data)}

                    <h1>{data.recipe.title}</h1>
                    <img
                        src={
                            cookingData && cookingData[data.recipe.recipe_id]
                                ? (() => {
                                      console.log("SAVED");
                                      return cookingData[data.recipe.recipe_id];
                                  })()
                                : (() => {
                                      console.log("FETCHED");
                                      return data.recipe.image_url;
                                  })()
                        }
                        alt="item image"
                    />

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
                            {data.recipe.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ol>
                    </div>

                    <div>
                        {Object.keys(favRecipe).includes(
                            data.recipe.recipe_id
                        ) ? (
                            <FaStar
                                className={`${Style.star} ${Style.starYellow}`}
                                onClick={(event) => {
                                    preventDefaultBehaviorOfLink(event);
                                    starClickHandler(data.recipe);
                                }}
                            />
                        ) : (
                            <CiStar
                                className={`${Style.star} ${Style.starBlack}`}
                                onClick={(event) => {
                                    preventDefaultBehaviorOfLink(event);
                                    starClickHandler(data.recipe);
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
