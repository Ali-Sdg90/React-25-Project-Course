import React from "react";
import useResizeWinHook from "./useResizeWinHook";
import Style from "./P14.module.css";

const P14 = () => {
    const { width, height } = useResizeWinHook();

    return (
        <div className={Style.container}>
            <h2 className={Style.header}>useResizeWinHook</h2>
            <div>
                Width: <pre>{width}px</pre> - Height: <pre>{height}px</pre>
            </div>
        </div>
    );
};

export default P14;
