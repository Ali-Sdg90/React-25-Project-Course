import React from "react";
import Counter from "./Counter";
import { Provider } from "react-redux";
import store from "./store";

const A3 = () => {
    return (
        <div>
            <Provider store={store}>
                <Counter />
            </Provider>
        </div>
    );
};

export default A3;
