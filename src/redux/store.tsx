import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slice/ProductSlice";
import OrderReducer from "./slice/OrderSlice";

const store = configureStore({
  reducer: {
    product: ProductReducer,
    orders: OrderReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
