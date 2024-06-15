import React, { createContext, useState } from "react";

export const appContext = createContext({});

const AppContext = ({ children }) => {
    const [cookingData, setCookingData] = useState();

    return (
        <appContext.Provider value={{ cookingData, setCookingData }}>
            {children}
        </appContext.Provider>
    );
};

export default AppContext;
