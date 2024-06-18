import React, { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar";
import { appContext } from "../../../Context/AppContext";
import Card from "./Card";
import Style from "./Home.module.css";
import { cookingContext } from "../Context/Context";

const Favorite = () => {
    const { favRecipe } = useContext(appContext);
    const { searchFavorite } = useContext(cookingContext);
    const [searchedRecipe, setSearchedRecipe] = useState([]);

    useEffect(() => {
        const searchResultsID = Object.keys(favRecipe).filter((key) =>
            favRecipe[key].title.toLowerCase().includes(searchFavorite)
        );

        setSearchedRecipe(searchResultsID.map((key) => favRecipe[key]));

        // console.log("searchResults", searchResultsID);
    }, [searchFavorite, favRecipe]);

    useEffect(() => {
        console.log("searchedRecipe => ", searchedRecipe);
    }, [searchedRecipe]);

    return (
        <div className={Style.container}>
            <NavBar navMode={"Favorite"} />

            <h1>
                {Object.keys(favRecipe).length > 1 ||
                !Object.keys(favRecipe).length
                    ? "Favorites"
                    : "Favorite"}
            </h1>

            <div className={Style.items}>
                {Object.keys(searchedRecipe).length ? (
                    Object.keys(searchedRecipe).map((key) => (
                        <Card key={key} item={searchedRecipe[key]} />
                    ))
                ) : Object.keys(favRecipe).length ? (
                    <h1>
                        No Search Result for "{searchFavorite}" in Your
                        Favorites!
                    </h1>
                ) : (
                    <h1>You Don't have any Favorites!</h1>
                )}
            </div>
        </div>
    );
};

export default Favorite;
