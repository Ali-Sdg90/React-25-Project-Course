import React, { useEffect, useState } from "react";
import { sideMenu } from "./sideMenu.js";
import Style from "./P6.module.css";

const P6 = () => {
    const [htmlElements, setHtmlElements] = useState([]);
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const createSideMenu = (items, dept, idPrefix) => {
        return items.map((item, index) => {
            const id = `${idPrefix}-${index}`;
            const isExpanded = expandedItems[id];

            return (
                <div key={id}>
                    <span
                        className={Style.label}
                        style={{ marginLeft: `${15 * dept}px` }}
                    >
                        <span onClick={() => toggleExpand(id)}>
                            {item.label}
                        </span>
                    </span>

                    {item.children && (
                        <>
                            <span
                                onClick={() => toggleExpand(id)}
                                style={{ cursor: "pointer" }}
                            >
                                {isExpanded ? " ↓" : " →"}
                            </span>
                            <br />
                            {isExpanded &&
                                createSideMenu(item.children, dept + 1, id)}
                        </>
                    )}

                    {!item.children && <br />}
                </div>
            );
        });
    };

    useEffect(() => {
        setHtmlElements(createSideMenu(sideMenu, 0, "0"));
    }, [expandedItems]);

    return <div>{htmlElements}</div>;
};

export default P6;
