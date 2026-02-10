import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>{counter}</h1>
            <button onClick={() => dispatch({ type: "Add" })}>Add</button>
            <button onClick={() => dispatch({ type: "Remove" })}>Remove</button>
        </div>
    );
};

export default Counter;
