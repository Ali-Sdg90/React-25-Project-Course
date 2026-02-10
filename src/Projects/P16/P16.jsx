import React, { useRef } from "react";
import useSections from "./useSections";
import Style from "./P16.module.css";

const P16 = () => {
    const { sections, isLoading, errorMsg } = useSections();

    const sectionRefs = useRef([]);

    const goToSection = (index) => {
        sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={Style.container}>
            {!isLoading ? (
                errorMsg ? (
                    <h1>{errorMsg}</h1>
                ) : (
                    <>
                        <h2 style={{ margin: "5px 0 15px" }}>Go to Section</h2>

                        <div className={Style.btns}>
                            {sections.map((episode, index) => {
                                if (index < 10) {
                                    return (
                                        <button
                                            onClick={() => goToSection(index)}
                                            key={index}
                                        >
                                            {episode.name}
                                        </button>
                                    );
                                }
                            })}
                        </div>

                        {sections.map((episode, index) => {
                            if (index < 10) {
                                return (
                                    <div
                                        style={{
                                            backgroundColor: `#${index}${index}${index}`,
                                            height: "100px",
                                            padding: "10px",
                                        }}
                                        ref={(el) =>
                                            (sectionRefs.current[index] = el)
                                        }
                                        key={index}
                                    >
                                        <div>{episode.name}</div>
                                        <div>{episode.date}</div>
                                    </div>
                                );
                            }
                        })}
                    </>
                )
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default P16;
