import React, { useEffect, useState } from "react";
import "./P2.css";

const P2 = () => {
    const [isHexMode, setIsHexMode] = useState(true);
    const [randomColor, setRandomColor] = useState("");

    const createRandomNumber = (min, max) => {
        const random = Math.floor(Math.random() * (max - min)) + min;
        return random.toString();
    };

    const CreateRandomHEXColor = () => {
        const HEXChars = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
        ];

        let randomHEXValue = "#";

        for (let i = 0; i < 6; i++) {
            randomHEXValue += HEXChars[createRandomNumber(0, 16)];
        }

        setRandomColor(randomHEXValue);
    };

    const CreateRandomRGBColor = () => {
        const R = createRandomNumber(0, 256).padStart(3, "0");
        const G = createRandomNumber(0, 256).padStart(3, "0");
        const B = createRandomNumber(0, 256).padStart(3, "0");

        setRandomColor(`rgb(${R},${G},${B})`);
    };

    useEffect(() => {
        CreateRandomHEXColor();
    }, []);

    return (
        <div className="container">
            <div>
                <button
                    disabled={isHexMode}
                    onClick={() => setIsHexMode((prevState) => !prevState)}
                >
                    Switch to HEX Color
                </button>
                <button
                    disabled={!isHexMode}
                    onClick={() => setIsHexMode((prevState) => !prevState)}
                >
                    Switch to RGB Color
                </button>
            </div>

            <button
                onClick={
                    isHexMode ? CreateRandomHEXColor : CreateRandomRGBColor
                }
            >
                Create Random {isHexMode ? "HEX" : "RGB"} Color
            </button>

            <div className="color-div" style={{ backgroundColor: randomColor }}>
                <div>{randomColor}</div>
            </div>
        </div>
    );
};

export default P2;
