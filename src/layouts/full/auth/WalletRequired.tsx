import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import ConnectWalletButton from "../header/connect/ConnectWalletButton";
import {
	ethersAuthenticate,
	getNonce,
	getStoredJWT,
	isTokenExpired,
	storeJWT,
} from "../../../utils";
import { checkAdmin, login } from "../../../services/auth";
import { useAppDispatch } from "../../../redux/hooks";
import { updateAdmin, updateJWT } from "../../../redux/connection/walletSlice";

export default function WalletRequired(props: { children: React.ReactNode }) {
	const { address, signer, authentication } = useAppSelector(
		(state) => state.wallet
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const jwt = getStoredJWT(address);
		if (jwt) {
			if (!isTokenExpired(jwt)) {
				dispatch(updateJWT(jwt));
				checkAdmin(jwt)
					.then((response) => {
						dispatch(updateAdmin(response.isAdmin));
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				dispatch(updateJWT(undefined));
				dispatch(updateAdmin(false));
			}
		} else {
			dispatch(updateJWT(undefined));
			dispatch(updateAdmin(false));
		}
	}, [address]);

	const handleAuth = async () => {
		const nonce = getNonce();
		if (signer) {
			const signature = await ethersAuthenticate(
				`I am signing my one time nonce:${nonce}`,
				signer
			);
			login({
				signature: signature.message,
				nonce: nonce,
				walletAddress: address,
			})
				.then((res) => {
					dispatch(updateJWT(res.jwt));
					storeJWT(address, res.jwt);
					checkAdmin(res.jwt)
						.then((response) => {
							dispatch(updateAdmin(response.isAdmin));
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<Box>
			{address && signer ? (
				<>
					{authentication ? (
						<Box>{props.children}</Box>
					) : (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
								width: "fit-content",
								ml: "auto",
								mr: "auto",
							}}
						>
							<Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
								Please verify your identity
							</Typography>
							<Button variant="contained" onClick={handleAuth}>
								Authenticate
							</Button>
						</Box>
					)}
				</>
			) : (
				<Typography variant="h4" sx={{ textAlign: "center" }}>
					Please connect your wallet first!
				</Typography>
			)}
		</Box>
	);
}
