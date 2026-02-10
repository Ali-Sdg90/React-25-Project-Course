import React, { createContext, useState } from "react";

export const cookingContext = createContext(null);

const Context = ({ children }) => {
    const [search, setSearch] = useState("pizza");
    const [favorite, setFavorite] = useState("pizza");
    const [searchFavorite, setSearchFavorite] = useState("");

    return (
        <cookingContext.Provider
            value={{
                search,
                setSearch,
                favorite,
                setFavorite,
                searchFavorite,
                setSearchFavorite,
            }}
        >
            {children}
        </cookingContext.Provider>
    );
};

export default Context;
