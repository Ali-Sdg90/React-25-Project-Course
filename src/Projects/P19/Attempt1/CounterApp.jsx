import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CounterApp = () => {
    const counter = useSelector((state) => state.counter);

    const dispatch = useDispatch();

    const addCounter = () => {
        dispatch({ type: "add" });
    };

    const removeCounter = () => {
        dispatch({ type: "remove" });
    };

    return (
        <div>
            {/* <h1>Counter App</h1> */}
            <h1>{counter}</h1>

            <button onClick={addCounter}>Counter + 1</button>
            <button onClick={removeCounter}>Counter - 1</button>
        </div>
    );
};

export default CounterApp;
