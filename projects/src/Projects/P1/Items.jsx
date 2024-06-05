import React, { useState } from "react";
import data from "./data";
import Style from "./Items.module.css";

const Items = () => {
    const [itemSelected, setItemSelected] = useState([]);
    const [multipleSelectItem, setMultipleSelectItem] = useState(false);

    const itemClickHandler = (id) => {
        console.log("id", id);
        console.log("itemSelected", itemSelected);

        const index = itemSelected.indexOf(id);

        if (index === -1) {
            if (multipleSelectItem) {
                setItemSelected((prevState) => [...prevState, id]);
            } else {
                setItemSelected([id]);
            }
        } else {
            const currentArray = [...itemSelected];
            currentArray.splice(index, 1);
            setItemSelected(currentArray);
        }
    };

    return (
        <div>
            <button
                className={Style.btn}
                onClick={() => setMultipleSelectItem((prevState) => !prevState)}
            >
                Switch to {multipleSelectItem ? "Single" : "Multiple"} Item
                Selection
            </button>
            {data.map((item) => {
                return (
                    <div
                        onClick={() => itemClickHandler(item.id)}
                        key={item.id}
                        className={Style.items}
                    >
                        <h3>{item.title}</h3>
                        {itemSelected.indexOf(item.id) !== -1 && (
                            <div>{item.description}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Items;
