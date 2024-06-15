import React, { createContext, useState } from "react";

export const cookingContext = createContext(null);

const Context = ({ children }) => {
    const [search, setSearch] = useState("pizza");
    const [favorite, setFavorite] = useState("pizza");

    return (
        <cookingContext.Provider
            value={{ search, setSearch, favorite, setFavorite }}
        >
            {children}
        </cookingContext.Provider>
    );
};

export default Context;
