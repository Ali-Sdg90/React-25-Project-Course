import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Favorite from "./Pages/Favorite";
import Context from "./Context/Context";
import useLocalStorage from "../P8/localStorage";
import { appContext } from "../../Context/AppContext";

const CookingSite = () => {
    const { favRecipe, setFavRecipe } = useContext(appContext);

    const [localRecipes, setLocalRecipes] = useLocalStorage("Fav_Recipes", {});

    useEffect(() => {
        if (localRecipes && Object.keys(localRecipes).length > 0) {
            setFavRecipe(localRecipes);
        }
    }, [localRecipes, setFavRecipe]);

    useEffect(() => {
        if (favRecipe) {
            setLocalRecipes(favRecipe);
        }
    }, [favRecipe, setLocalRecipes]);

    return (
        <div>
            <Context>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/favorite" element={<Favorite />} />
                    <Route
                        path="*"
                        element={<h1>Cooking Page Not Found!</h1>}
                    />
                </Routes>
            </Context>
        </div>
    );
};

export default CookingSite;
