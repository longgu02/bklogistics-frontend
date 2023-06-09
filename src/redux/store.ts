import { configureStore } from "@reduxjs/toolkit";
import orderCreateReducer from "./order/orderCreateSlice";
import orderSlice from "./order/orderSlice";
import walletReducer from "./connection/walletSlice";
import userReducer from "./connection/userSlice";
import registerReducer from "./authentication/registerSlice";
export const store = configureStore({
	reducer: {
		orderCreate: orderCreateReducer,
		orderData: orderSlice,
		wallet: walletReducer,
		user: userReducer,
		register: registerReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
