import React from "react";
import useLocalStorage from "./localStorage";
import Style from "./P8.module.css";

const P8 = () => {
    const [theme, setTheme] = useLocalStorage("Theme", "Light");

    const changeThemeHandler = () => {
        setTheme((prevState) => (prevState === "Light" ? "Dark" : "Light"));
    };

    return (
        <div
            className={`${Style.container} ${
                theme === "Light" ? Style.light : Style.dark
            }`}
        >
            <h1>Theme: {theme}</h1>
            <pre>#localStorage</pre>
            <button onClick={changeThemeHandler}>Change Theme</button>
        </div>
    );
};

export default P8;
