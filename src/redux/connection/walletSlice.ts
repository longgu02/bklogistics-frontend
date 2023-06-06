import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BrowserProvider, JsonRpcSigner, Provider, Signer } from "ethers";

export type WalletState = {
	address: string;
	chainId: number;
	provider?: BrowserProvider;
	signer?: JsonRpcSigner;
	balance?: number;
};

const initialState: WalletState = {
	address: "",
	chainId: -1,
	provider: undefined,
	signer: undefined,
	balance: undefined,
};

export const walletSlice = createSlice({
	name: "wallet",
	initialState: initialState,
	reducers: {
		updateWallet: (state, action: PayloadAction<WalletState>) => {
			state.address = action.payload.address;
			state.chainId = Number(action.payload.chainId);
			state.provider = action.payload.provider;
			state.signer = action.payload.signer;
			state.balance = action.payload.balance;
		},
		updateAddress: (state, action: PayloadAction<string>) => {
			state.address = action.payload;
		},
		updateChain: (state, action: PayloadAction<number>) => {
			state.chainId = action.payload;
		},
		updateProvider: (state, action: PayloadAction<BrowserProvider>) => {
			state.provider = action.payload;
		},
		updateSigner: (state, action: PayloadAction<JsonRpcSigner>) => {
			state.signer = action.payload;
		},
		updateBalance: (state, action: PayloadAction<number>) => {
			state.balance = action.payload;
		},
		removeWallet: (state) => {
			state.address = "";
			state.chainId = -1;
			state.provider = undefined;
			state.signer = undefined;
			state.balance = undefined;
		},
	},
});

export const {
	updateWallet,
	updateAddress,
	updateChain,
	updateProvider,
	updateSigner,
	updateBalance,
	removeWallet,
} = walletSlice.actions;

export default walletSlice.reducer;
