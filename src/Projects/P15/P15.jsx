import React from "react";

const P15 = () => {
    const clickHandlerTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };

    const clickHandlerBtm = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            left: 0,
            behavior: "smooth",
        });
    };

    return (
        <div>
            <h2 style={{ margin: "5px 0 15px" }}>scrollTo()</h2>
            <button onClick={clickHandlerTop}>Go to Top</button>
            <span> - - - </span>
            <button onClick={clickHandlerBtm}>Go to Bottom</button>
        </div>
    );
};

export default P15;
