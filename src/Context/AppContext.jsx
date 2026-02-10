import React, { createContext, useState } from "react";

export const appContext = createContext({});

const AppContext = ({ children }) => {
    const [cookingData, setCookingData] = useState();
    const [favRecipe, setFavRecipe] = useState([]);

    return (
        <appContext.Provider
            value={{ cookingData, setCookingData, favRecipe, setFavRecipe }}
        >
            {children}
        </appContext.Provider>
    );
};

export default AppContext;
