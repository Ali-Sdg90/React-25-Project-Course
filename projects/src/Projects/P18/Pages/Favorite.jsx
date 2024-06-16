import React, { useContext } from "react";
import NavBar from "../NavBar";
import { appContext } from "../../../Context/AppContext";
import Card from "./Card";
import Style from "./Home.module.css";

const Favorite = () => {
    const { favRecipe } = useContext(appContext);

    return (
        <div className={Style.container}>
            <NavBar />

            <h1>
                {Object.keys(favRecipe).length > 1 ||
                !Object.keys(favRecipe).length
                    ? "Favorites"
                    : "Favorite"}
            </h1>

            <div className={Style.items}>
                {Object.keys(favRecipe).length ? (
                    Object.keys(favRecipe).map((key) => (
                        <Card key={key} item={favRecipe[key]} />
                    ))
                ) : (
                    <h1>You Don't have any Favorites!</h1>
                )}
            </div>
        </div>
    );
};

export default Favorite;
