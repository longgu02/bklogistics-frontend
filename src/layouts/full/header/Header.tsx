import React from "react";
import {
	Box,
	AppBar,
	Toolbar,
	styled,
	Stack,
	IconButton,
	Badge,
	Button,
} from "@mui/material";
import { BrowserProvider, ethers } from "ethers";
import PropTypes from "prop-types";
import { RolesContractABI } from "../../../contract/abis/RolesContractABI";
import { ROLES_CONTRACT } from "../../../constants/address";
// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useSnackbar } from "notistack";
import useNotify from "../../../hooks/useNotify";

interface ItemType {
	toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	updateAddress,
	updateWallet,
} from "../../../redux/connection/walletSlice";
import { formatAddress } from "../../../utils";
// import { useAppDispatch } from "../redux/hooks";
// import { updateWallet } from "../redux/connection/walletSlice";

const Header = ({ toggleMobileSidebar }: ItemType) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [isConnected, setConnected] = React.useState<boolean>(false);
	const { successNotify, errorNotify, infoNotify } = useNotify();
	const [provider, setProvider] = React.useState<BrowserProvider>();
	const dispatch = useAppDispatch();
	const { address } = useAppSelector((state) => state.wallet);
	const connect = async () => {
		if (provider) {
			setConnected(true);
			try {
				const signer = await provider.getSigner();
				const accounts = await provider.send("eth_requestAccounts", []);
				const accountBalance = await provider.getBalance(accounts[0]);
				// const chainId = await provider.getNetwork()["chainId"] | 5
				const chainId = "5";
				dispatch(
					updateWallet({
						address: accounts[0],
						chainId: chainId,
						provider: provider,
						signer: signer,
						balance: Number(ethers.formatEther(accountBalance)),
					})
				);
			} catch (error: any) {
				if (error.code == "ACTION_REJECTED") {
					errorNotify(`Error: User rejected`);
				}
			}
		}
	};

	const _handleAccountChanged = (account: Array<string>) => {
		const accountSwitched = account[0];
		dispatch(updateAddress(accountSwitched));
		successNotify(`Account changed to ${accountSwitched}`);
	};

	const _handleDisconnect = (account: Array<string>) => {
		setConnected(false);
		infoNotify(`Wallet disconnected`);
	};

	const _handleChainChanged = (account: Array<string>) => {
		infoNotify(`Changed to chain`); // config chain information
	};

	const _handleConnect = (account: Array<string>) => {
		successNotify(`Wallet connected`);
	};

	React.useEffect(() => {
		const pd = new ethers.BrowserProvider(window.ethereum);
		window.ethereum.on("connect", _handleConnect);
		window.ethereum.on("accountsChanged", _handleAccountChanged);
		window.ethereum.on("disconnect", _handleDisconnect);
		window.ethereum.on("chainChanged", _handleChainChanged);
		setProvider(pd);
		console.log("rerender");
		return () => {
			window.ethereum.removeListener("connect", _handleConnect);
			window.ethereum.removeListener("accountsChanged", _handleAccountChanged);
			window.ethereum.removeListener("disconnect", _handleDisconnect);
			window.ethereum.removeListener("chainChanged", _handleChainChanged);
		};
	}, []);

	// const callContract = async () => {
	// 	const contract = new ethers.Contract(
	// 		ROLES_CONTRACT,
	// 		RolesContractABI,
	// 		signer
	// 	);
	// 	await contract
	// 		.hasRole(
	// 			"0xffa60083152bd11704a80cc8c7a409dad8aa74288b454a3ba0e94c0abc7cf168",
	// 			"0xf6f94b71bbdc4716dc138a04593a7fb0504f3e43"
	// 		)
	// 		.then((res) => console.log(res));
	// 	// .addMember("0xF6f94b71bbdc4716dc138A04593a7fb0504F3e43")
	// };
	const AppBarStyled = styled(AppBar)(({ theme }) => ({
		boxShadow: "none",
		background: theme.palette.background.paper,
		justifyContent: "center",
		backdropFilter: "blur(4px)",
		[theme.breakpoints.up("lg")]: {
			minHeight: "70px",
		},
	}));
	const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
		width: "100%",
		color: theme.palette.text.secondary,
	}));

	return (
		<AppBarStyled position="sticky" color="default">
			<ToolbarStyled>
				<IconButton
					color="inherit"
					aria-label="menu"
					onClick={toggleMobileSidebar}
					sx={{
						display: {
							lg: "none",
							xs: "inline",
						},
					}}
				>
					<IconMenu width="20" height="20" />
				</IconButton>

				<IconButton
					size="large"
					aria-label="show 11 new notifications"
					color="inherit"
					aria-controls="msgs-menu"
					aria-haspopup="true"
				>
					<Badge variant="dot" color="primary">
						<IconBellRinging size="21" stroke="1.5" />
					</Badge>
				</IconButton>
				<Box flexGrow={1} />
				<Stack spacing={1} direction="row" alignItems="center">
					<Button
						variant="contained"
						disableElevation
						color="primary"
						onClick={connect}
					>
						<AccountBalanceWalletOutlinedIcon sx={{ mr: 1 }} />
						{address ? formatAddress(address, 5) : "Connect Wallet"}
					</Button>
					<Profile />
				</Stack>
			</ToolbarStyled>
		</AppBarStyled>
	);
};

Header.propTypes = {
	sx: PropTypes.object,
};

export default Header;
