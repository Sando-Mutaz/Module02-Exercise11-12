import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Reducer/AuthReducer";

export const store = configureStore({
    reducer: {
        AuthReducer: AuthReducer
    },
});