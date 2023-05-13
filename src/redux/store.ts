import { configureStore } from "@reduxjs/toolkit";
import orderCreateReducer from "./order/orderCreateSlice";
export const store = configureStore({
	reducer: {
		orderCreate: orderCreateReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
