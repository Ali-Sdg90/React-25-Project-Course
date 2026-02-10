import { createStore } from "redux";

const storeFunction = (state = { counter: 0 }, action) => {
    switch (action.type) {
        case "Add":
            return { counter: state.counter + 1 };
        case "Remove":
            return { counter: state.counter - 1 };
        default:
            return state;
    }
};

const store = createStore(storeFunction);

export default store;
