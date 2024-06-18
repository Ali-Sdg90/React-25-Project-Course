import React from "react";

import { Provider } from "react-redux";
import store from "./store";
import CounterApp from "./CounterApp";

const A1 = () => {
    return (
        <Provider store={store}>
            <CounterApp />
        </Provider>
    );
};

export default A1;
