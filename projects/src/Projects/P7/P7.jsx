import React, { useState } from "react";
import QRCode from "react-qr-code";
import Style from "./P7.module.css";

const P7 = () => {
    const [inputValue, setInputValue] = useState("Hello");

    const inputHandler = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={Style.container}>
            <div>
                <input value={inputValue} onChange={inputHandler} />
            </div>

            <QRCode size={256} value={inputValue} />
        </div>
    );
};

export default P7;
