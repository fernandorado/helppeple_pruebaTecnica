import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import usersReducer from "./reducers/userReducer";
import cartegoriesReducer from "./reducers/categoriesReducer";

const store = configureStore({
  reducer: {
    productsReducer,
    usersReducer,
    cartReducer,
    cartegoriesReducer,
  },
});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
