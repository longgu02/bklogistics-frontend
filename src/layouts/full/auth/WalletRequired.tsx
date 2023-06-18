import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import ConnectWalletButton from "../header/connect/ConnectWalletButton";

export default function WalletRequired(props: { children: React.ReactNode }) {
	const { address, signer } = useAppSelector((state) => state.wallet);
	return (
		<Box>
			{address && signer ? (
				<>{props.children}</>
			) : (
				<Typography variant="h4" sx={{ textAlign: "center" }}>
					Please connect your wallet first!
				</Typography>
			)}
		</Box>
	);
}
