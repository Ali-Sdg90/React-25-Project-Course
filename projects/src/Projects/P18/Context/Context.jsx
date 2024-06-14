import React, { createContext, useState } from "react";

export const cookingContext = createContext(null);

const Context = ({ children }) => {
    const [search, setSearch] = useState("pizza");

    return (
        <cookingContext.Provider value={{ search, setSearch }}>
            {children}
        </cookingContext.Provider>
    );
};

export default Context;
