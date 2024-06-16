import React, { useContext } from "react";
import NavBar from "../NavBar";
import { appContext } from "../../../Context/AppContext";

const Favorite = () => {
    const { favRecipe, setFavRecipe } = useContext(appContext);

    return (
        <div>
            <NavBar />

            <h1>Favorite</h1>
        </div>
    );
};

export default Favorite;
