import { createStore } from "redux";

const storeFunc = (state = { counter: 0 }, action) => {
    switch (action.type) {
        case "add":
            return { counter: state.counter + 1 };
        case "remove":
            return { counter: state.counter - 1 };
        default:
            return state;
    }
};

const store = createStore(storeFunc);
export default store;
