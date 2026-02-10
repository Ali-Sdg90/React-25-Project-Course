import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Style from "./Home.module.css";
import { appContext } from "../../../Context/AppContext";

const Card = ({ item }) => {
    const { cookingData, favRecipe, setFavRecipe } = useContext(appContext);

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
        <div>
            <Link
                key={item.recipe_id}
                to={`/React-25-Project-Course/cooking-site/details/${item.recipe_id}`}
            >
                <div className={Style.card}>
                    <img
                        src={
                            cookingData && cookingData[item.recipe_id]
                                ? (() => {
                                      console.log("SAVED");
                                      return cookingData[item.recipe_id];
                                  })()
                                : (() => {
                                      console.log("FETCHED");
                                      return item.image_url;
                                  })()
                        }
                        alt="item image"
                        style={{
                            background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${
                                cookingData && cookingData[item.recipe_id]
                                    ? cookingData[item.recipe_id]
                                    : item.image_url
                            })`,
                        }}
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
                                    preventDefaultBehaviorOfLink(event)
                                }
                            >
                                {item.publisher}
                            </a>
                        </div>
                    </div>
                    {Object.keys(favRecipe).includes(item.recipe_id) ? (
                        <FaStar
                            className={`${Style.star} ${Style.starYellow}`}
                            onClick={(event) => {
                                preventDefaultBehaviorOfLink(event);
                                starClickHandler(item);
                            }}
                        />
                    ) : (
                        <CiStar
                            className={`${Style.star} ${Style.starBlack}`}
                            onClick={(event) => {
                                preventDefaultBehaviorOfLink(event);
                                starClickHandler(item);
                            }}
                        />
                    )}
                </div>
            </Link>
        </div>
    );
};

export default Card;
