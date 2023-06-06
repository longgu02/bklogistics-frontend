import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Fade,
	IconButton,
	List,
	ListItem,
	Modal,
	Paper,
	Tooltip,
	Typography,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import useNotify, { errorNotify } from "../../../../hooks/useNotify";
import {
	formatAddress,
	getSessionInfo,
	removeSessionInfo,
	storeSession,
} from "../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { NETWORKS, getNetworkInfo } from "../../../../constants/chain";
import { BrowserProvider, ethers } from "ethers";
import React from "react";
import {
	removeWallet,
	updateAddress,
	updateBalance,
	updateChain,
	updateProvider,
	updateSigner,
	updateWallet,
} from "../../../../redux/connection/walletSlice";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Link from "next/link";

const modalStyle = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function ConnectWalletButton() {
	const [isConnected, setConnected] = React.useState<boolean>(false);
	const { successNotify, errorNotify, infoNotify } = useNotify();
	const [provider, setProvider] = React.useState<BrowserProvider>();
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [isCopied, setCopy] = React.useState<boolean>(false);
	const { chainId, address, signer, balance } = useAppSelector(
		(state) => state.wallet
	);
	const [isOpen, setOpen] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();
	const connect = async () => {
		if (window.ethereum == undefined) {
			errorNotify("Please download Metamask");
			return;
		}
		if (provider) {
			setLoading(true);
			try {
				const signer = await provider.getSigner();
				const accounts = await provider.send("eth_requestAccounts", []);
				const accountBalance = await provider.getBalance(accounts[0]);
				const network = await provider.getNetwork();
				chainCheck(Number(network.chainId));
				storeSession(provider, signer);
				dispatch(
					updateWallet({
						address: accounts[0],
						chainId: Number(network.chainId),
						provider: provider,
						signer: signer,
						balance: Number(ethers.formatEther(accountBalance)),
					})
				);
				setLoading(false);
			} catch (error: any) {
				if (error.code == "ACTION_REJECTED") {
					errorNotify(`Error: User rejected`);
				}
				setLoading(false);
			}
		}
		successNotify(`Wallet connected`);
	};

	const chainCheck = (chainId: number) => {
		if (
			!Object.keys(NETWORKS).find(
				(key) => NETWORKS[key].chainId == Number(chainId)
			)
		) {
			window.ethereum
				.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: "0x5" }],
				})
				.then(() => {
					// Network switch successful
					dispatch(updateChain(5));
					// infoNotify(
					// 	`Switched to ${NETWORKS.GOERLI_TESTNET.metadata.chainName}`
					// );
				})
				.catch((error: any) => {
					// Network switch failed
					if (error.code == "ACTION_REJECTED") {
						errorNotify(
							`Switched to ${NETWORKS.GOERLI_TESTNET.metadata.chainName} failed: User rejected`
						);
					} else {
						`Switched to ${NETWORKS.GOERLI_TESTNET.metadata.chainName} failed: ${error}`;
					}
				});
		}
	};

	const _handleAccountChanged = async (account: Array<string>) => {
		const pd = new ethers.BrowserProvider(window.ethereum);
		const accountSwitched = account[0];
		const signer = await pd.getSigner();
		pd.getBalance(signer.address).then((balance) => {
			dispatch(updateBalance(Number(ethers.formatEther(balance))));
		});
		dispatch(updateSigner(signer));
		dispatch(updateAddress(accountSwitched));
		storeSession(pd, signer);
		successNotify(`Account changed to ${accountSwitched}`);
	};

	const _handleDisconnect = (res: any) => {
		setConnected(false);
		removeSessionInfo();
		errorNotify(`Wallet disconnected`);
	};

	const _handleChainChanged = (chainId: string) => {
		dispatch(updateChain(Number(chainId)));
		if (Number(chainId) == NETWORKS.GOERLI_TESTNET.chainId) {
			infoNotify(`Switched to ${NETWORKS.GOERLI_TESTNET.metadata.chainName}`);
		} else if (Number(chainId) == NETWORKS.BSC_TESTNET.chainId) {
			infoNotify(`Switched to ${NETWORKS.BSC_TESTNET.metadata.chainName}`);
		} else {
			infoNotify(`Chain switched, ID:${chainId}`);
		}
	};

	const _handleConnect = (res: any) => {
		successNotify(`Wallet connected`);
		dispatch(updateChain(Number(res.chainId)));
	};

	React.useEffect(() => {
		const pd = new ethers.BrowserProvider(window.ethereum);
		if (window.ethereum == undefined) {
			errorNotify("Please download Metamask");
			return;
		}
		if (pd && window.ethereum.isConnected()) {
			const { signer } = getSessionInfo(pd);
			if (signer && pd) {
				pd.getBalance(signer.address).then((balance) => {
					dispatch(updateBalance(Number(ethers.formatEther(balance))));
				});
				dispatch(updateProvider(pd));
				dispatch(updateSigner(signer));
				dispatch(updateAddress(signer.address));
				setProvider(provider);
			} else {
				dispatch(updateProvider(pd));
				setProvider(pd);
			}
			chainCheck(chainId);
			window.ethereum.on("connect", _handleConnect);
			window.ethereum.on("accountsChanged", _handleAccountChanged);
			window.ethereum.on("disconnect", _handleDisconnect);
			window.ethereum.on("chainChanged", _handleChainChanged);
			return () => {
				window.ethereum.removeListener("connect", _handleConnect);
				window.ethereum.removeListener(
					"accountsChanged",
					_handleAccountChanged
				);
				window.ethereum.removeListener("disconnect", _handleDisconnect);
				window.ethereum.removeListener("chainChanged", _handleChainChanged);
			};
		}
	}, [address]);

	const handleCopyAddress = async () => {
		await navigator.clipboard.writeText(address);
		setCopy(true);
	};

	const handleDisconnect = async () => {
		window.ethereum.removeListener("connect", _handleConnect);
		window.ethereum.removeListener("accountsChanged", _handleAccountChanged);
		window.ethereum.removeListener("disconnect", _handleDisconnect);
		window.ethereum.removeListener("chainChanged", _handleChainChanged);
		dispatch(removeWallet());
		removeSessionInfo();
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box>
			<Button
				variant="contained"
				disableElevation
				color="primary"
				// onClick={connect}
				onClick={handleOpen}
				sx={{ width: 170 }}
			>
				{isLoading ? (
					<CircularProgress size={30} color="inherit" />
				) : (
					<>
						<AccountBalanceWalletOutlinedIcon sx={{ mr: 1 }} />
						{address ? formatAddress(address, 5) : "Connect Wallet"}
					</>
				)}
			</Button>
			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				{signer && address ? (
					<Box>
						<DialogTitle
							id="alert-dialog-title"
							sx={{
								textAlign: "center",
								backgroundColor: "#EBECEC",
							}}
						>
							<Typography variant="h5">Wallet Connected</Typography>

							<Typography>Connected with Metamask</Typography>
						</DialogTitle>
						<DialogContent sx={{ mt: 2 }}>
							<Typography>
								<span style={{ fontWeight: "bold" }}>Current Account: </span>{" "}
								{formatAddress(address, 7)}
								<Tooltip title={isCopied ? "Copied" : "Copy"}>
									<IconButton onClick={handleCopyAddress}>
										<ContentCopyIcon />
									</IconButton>
								</Tooltip>
							</Typography>
							<Typography>
								<span style={{ fontWeight: "bold" }}>Balance: </span> {balance}
							</Typography>
							<Box sx={{ alignItems: "baseline", mt: 1 }}>
								<Link
									href={`${
										getNetworkInfo(chainId)?.blockExplorerUrls[0]
									}address/${address}`}
									target="blank"
								>
									View account on explorer
								</Link>
								<LaunchIcon sx={{ marginLeft: 0.5, fontSize: 15 }} />
							</Box>
						</DialogContent>
						<DialogActions sx={{ display: "flex" }}>
							<Button
								variant="contained"
								color="error"
								sx={{ ml: "auto", mr: "auto" }}
								onClick={handleDisconnect}
							>
								Disconnect
							</Button>
						</DialogActions>
					</Box>
				) : (
					<Box>
						<DialogTitle
							id="alert-dialog-title"
							sx={{
								textAlign: "center",
								backgroundColor: "#EBECEC",
							}}
						>
							<Typography variant="h5">Choose Wallet</Typography>

							<Typography>
								Safely connect to your existing blockchain wallet.
							</Typography>
						</DialogTitle>
						<DialogContent sx={{ mt: 2 }}>
							<List
								disablePadding={true}
								style={{ display: "flex", justifyContent: "space-between" }}
							>
								<ListItem
									button
									onClick={() => connect()}
									sx={{
										display: "flex",
										flexDirection: "column",
										borderRadius: "10px",
										width: 180,
										height: 120,
									}}
								>
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
										alt="metamask"
										style={{ height: 80, width: 80, objectFit: "contain" }}
									/>
									<Typography noWrap variant="subtitle2">
										Metamask
									</Typography>
								</ListItem>

								<ListItem
									disabled
									sx={{
										display: "flex",
										flexDirection: "column",
										borderRadius: "10px",
										width: 180,
										height: 120,
									}}
								>
									<img
										src="https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.png"
										alt="metamask"
										style={{ height: 80, width: 80, objectFit: "contain" }}
									/>
									<Typography noWrap variant="subtitle2">
										Wallet Connect
									</Typography>
								</ListItem>
							</List>
						</DialogContent>
					</Box>
				)}
			</Dialog>
		</Box>
	);
}
