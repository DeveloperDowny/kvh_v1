import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { counterReducer } from "./reducers/counter";
import { authReducer } from "./reducers/auth";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    // userDetails: userDetailsReducer, //TODO
    // Add other slice reducers here
  },
});

export default store;

// Create a hook for useDispatch
export const useAppDispatch = () => useDispatch();
