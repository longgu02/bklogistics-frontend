import {
	Box,
	Button,
	TableCell,
	TableRow,
	Typography,
	Collapse,
	IconButton,
	Tabs,
	Tab,
	useTheme,
	Paper,
	Grid,
	FormControlLabel,
	Switch,
	Chip,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	DialogContent,
	TextField,
	Stack,
	CircularProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import usePricingContract, { Unit } from "../../hooks/usePricingContract";
import { useAppSelector } from "../../redux/hooks";
import { ethers } from "ethers";
import useNotify from "../../hooks/useNotify";
interface PricingRowProps {
	product: {
		productId: Number;
		name: String;
		type: String;
	};
}

// const DEMO_PRODUCT = [1,2,5,6,8,9,10];
const DEMO_PRODUCT = [1, 2, 5, 6];

export interface SimpleDialogProps {
	open: boolean;
	selectedValue: string;
	onClose: (value: string) => void;
}

export default function PricingRow(props: PricingRowProps) {
	const { product } = props;
	const { chainId, signer, address } = useAppSelector((state) => state.wallet);
	const [isOpen, setOpen] = useState<boolean>(false);
	const [isManuListed, setManuListed] = useState<boolean>();
	const [newPrice, setNewPrice] = useState<String>();
	const [newUnit, setNewUnit] = useState<String>();
	const [isLoading, setLoading] = useState<boolean>(false);
	const { errorNotify, successNotify } = useNotify();
	const [price, setPrice] = useState<{
		id: Number;
		price: String;
		unit: Unit;
	}>();
	const handleClick = () => {
		setOpen((prev) => !prev);
	};

	useEffect(() => {
		if (signer) {
			const { getPrice } = usePricingContract(signer, chainId);
			console.log("hihi");
			const receipt = getPrice(address, product.productId, 1)
				.then((res) => {
					console.log("res", res[0]);
					setPrice({
						id: Number(res[0]),
						price: ethers.formatEther(res[1]),
						unit: Number(res[2]),
					});
					setNewPrice(ethers.formatEther(res[1]));
					setNewUnit(String(Number(res[2])));
				})
				.catch((err) => console.log(err));
		}
	}, [signer, address, chainId]);

	console.log(price);
	const handleClose = () => {
		setOpen(false);
	};

	const renderUnit = () => {
		switch (price?.unit) {
			case Unit.KILOGRAM:
				return `Kilogram`;
			case Unit.LITTER:
				return `Litter`;
			case Unit.METER:
				return `Meter`;
			case Unit.NONE:
				return `Unit`;
		}
	};

	const updatedListener = () => {
		setPrice({ id: product.productId, price: newPrice, unit: newUnit });
		successNotify(
			`Price of ${product.name} (id: ${product.productId}) has been updated`
		);
		setLoading(false);
		setOpen(false);
	};

	const handleUpdate = () => {
		if (signer && newPrice) {
			setLoading(true);
			const { modifyPrice, contract } = usePricingContract(signer, chainId);
			console.log(
				product.productId,
				1,
				ethers.parseUnits(String(newPrice), "ether"),
				Number(newUnit)
			);
			const receipt = modifyPrice(
				product.productId,
				1,
				ethers.parseUnits(String(newPrice), "ether"),
				Number(newUnit)
			)
				.then((res) => {
					contract.on("PriceUpdated", () => updatedListener());
					contract.removeListener("PriceUpdated", () => updatedListener());
				})
				.catch((error) => {
					if (error.code == "ACTION_REJECTED") {
						errorNotify(`Error: User rejected`);
					} else {
						errorNotify(`Error: ${error.message}`);
					}
					setLoading(false);
				}); // Fix the type)
		}
	};

	return (
		<Paper sx={{ p: 2 }}>
			<Box
				onClick={handleClick}
				sx={{
					"&:hover": {
						cursor: "pointer",
					},
				}}
			>
				<Grid container>
					<Grid item xs={2}>
						<Typography sx={{ mt: 1 }}>{String(product.productId)}</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography sx={{ mt: 1 }}>{product.name}</Typography>
					</Grid>
					<Grid item xs={2}>
						{/* <Typography>0.1 ETH ($100)</Typography> */}
						<Chip
							label={product.type}
							size="small"
							sx={{
								mt: 1,
								px: "4px",
								color: "#fff",
								backgroundColor:
									product.type == "Material" ? "#78A2CC" : "#77DD77",
							}}
						/>
					</Grid>
					<Grid item xs={2}>
						{/* <Typography>0.1 ETH ($100)</Typography> */}
						<Typography sx={{ mt: 1 }}>{String(price?.price)} ETH</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography sx={{ mt: 1 }}>None</Typography>
					</Grid>
					<Grid item xs={2}>
						<FormControlLabel
							control={
								<Switch
									checked={isManuListed}
									onChange={(e) => {
										e.preventDefault();
										setManuListed((prev) => !prev);
									}}
								/>
							}
							label="Listed"
						/>
					</Grid>
					<Grid item xs={1}>
						{/* <IconButton sx={{ m: 0, p: 0 }}>
							<ExpandMoreIcon
								sx={
									isOpen
										? {
												transform: "rotate(-180deg)",
												transition: "0.5s",
										  }
										: {
												transform: "rotate(0deg)",
												transition: "0.5s",
										  }
								}
							/>
						</IconButton> */}
						<Button variant="contained">Update</Button>
					</Grid>
				</Grid>
			</Box>
			<Dialog onClose={handleClose} open={isOpen}>
				<DialogTitle sx={{ textAlign: "center" }}>
					Update {product.name} Price
				</DialogTitle>
				<DialogContent>
					<Stack spacing={2}>
						<TextField
							id="outlined-basic"
							label="Price"
							value={newPrice}
							onChange={(e) => setNewPrice(e.target.value)}
							fullWidth
						/>
						<TextField
							id="outlined-basic"
							label="Unit"
							value={newUnit}
							onChange={(e) => setNewUnit(e.target.value)}
							fullWidth
						/>
						{/* <TextField
							id="outlined-basic"
							label="Outlined"
							variant="outlined"
							fullWidth
						/> */}
						<Button variant="contained" onClick={handleUpdate}>
							{isLoading ? (
								<CircularProgress size={25} sx={{ color: "white" }} />
							) : (
								"Confirm"
							)}
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
		</Paper>
	);
}
