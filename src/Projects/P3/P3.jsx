import React, { useState } from "react";
import Style from "./P3.module.css";

const P3 = () => {
    const [numberOfStarts, setNumberOfStarts] = useState(-1);
    const [savedStarNumber, setSavedStarNumber] = useState(-1);

    const clickStarHandler = (i) => {
        if (i === savedStarNumber) {
            setSavedStarNumber(-1);
        } else {
            setSavedStarNumber(i);
        }
    };

    const addStarts = () => {
        let starts = [];

        for (let i = 0; i < 10; i++) {
            starts.push(
                <div
                    key={i}
                    className={Style.star}
                    style={{
                        backgroundColor:
                            numberOfStarts >= i ? "yellow" : "black",
                    }}
                    onMouseEnter={() => setNumberOfStarts(i)}
                    onClick={() => clickStarHandler(i)}
                ></div>
            );
        }

        return starts;
    };

    return (
        <div className={Style.container}>
            <div
                className={Style.stars}
                onMouseLeave={() => setNumberOfStarts(savedStarNumber)}
            >
                {addStarts()}
            </div>
            <input
                type="text"
                value={savedStarNumber + 1}
                className={Style.input}
                disabled={true}
            />
        </div>
    );
};

export default P3;
