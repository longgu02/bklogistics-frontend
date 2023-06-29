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
	Select,
	MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import usePricingContract, {
	PricingType,
	Unit,
} from "../../hooks/usePricingContract";
import { useAppSelector } from "../../redux/hooks";
import { ethers } from "ethers";
import useNotify from "../../hooks/useNotify";
import useProductContract from "../../hooks/useProductContract";
interface PricingRowProps {
	product: {
		productId: Number;
		name: String;
		type: PricingType;
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
	const [newPrice, setNewPrice] = useState<String>("0");
	const [newUnit, setNewUnit] = useState<String>("0");
	const [isLoading, setLoading] = useState<boolean>(false);
	const [isListed, setListed] = useState<boolean>(false);
	const [newListed, setNewListed] = useState<boolean>(false);
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
			const receipt = getPrice(address, product.productId, product.type)
				.then((res) => {
					setPrice({
						id: Number(res[0]),
						price: ethers.formatEther(res[1]),
						unit: Number(res[2]),
					});
					setListed(res[3]);
					setNewListed(res[3]);
					setNewPrice(ethers.formatEther(res[1]));
					setNewUnit(String(Number(res[2])));
				})
				.catch((err) => console.log(err));
		}
	}, [signer, address, chainId]);

	const handleClose = () => {
		setOpen(false);
	};

	const renderUnit = () => {
		switch (price?.unit) {
			case Unit.KILOGRAM:
				return `Kilogram`;
			case Unit.LITRE:
				return `Litre`;
			case Unit.METER:
				return `Meter`;
			case Unit.NONE:
				return `Pc`;
		}
	};

	const updatedListener = (contract: ethers.Contract) => {
		setPrice({
			id: product.productId,
			price: newPrice,
			unit: Number(newUnit),
		});
		setListed(newListed);
		successNotify(
			`Price of ${product.name} (id: ${product.productId}) has been updated`
		);
		setLoading(false);
		setOpen(false);
		contract.removeAllListeners();
	};

	const handleUpdate = async () => {
		if (signer && newPrice) {
			setLoading(true);
			const { modifyPrice, contract } = usePricingContract(signer, chainId);
			// const { getProduct, contract } = useProductContract(signer, chainId);
			// await contract.productCounter().then((res) => {
			// 	console.log("res: ", res);
			// });
			const receipt = modifyPrice(
				product.productId,
				ethers.parseUnits(String(newPrice), "ether"),
				newListed,
				product.type, // 1 as product , 0 as material
				Number(newUnit)
			)
				.then((res) => {
					contract.on("PriceUpdated", () => updatedListener(contract));
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
			<Box>
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
							label={
								product.type == PricingType.MATERIAL ? "Material" : "Product"
							}
							size="small"
							sx={{
								mt: 1,
								px: "4px",
								color: "#fff",
								backgroundColor:
									product.type == PricingType.MATERIAL ? "#78A2CC" : "#6ECCAF",
							}}
						/>
					</Grid>
					<Grid item xs={2}>
						{/* <Typography>0.1 ETH ($100)</Typography> */}
						<Typography sx={{ mt: 1 }}>{String(price?.price)} ETH</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography sx={{ mt: 1 }}>{renderUnit()}</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography
							sx={{
								mt: 1,
								color: isListed ? "#7AA874" : "#ff6961",
								fontWeight: 500,
							}}
						>
							{isListed ? "Listed" : "Not Listed"}
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<Button variant="contained" onClick={handleClick}>
							Update
						</Button>
					</Grid>
				</Grid>
			</Box>
			<Dialog onClose={handleClose} open={isOpen}>
				<DialogTitle
					sx={{ textAlign: "center", mb: 2, backgroundColor: "#EBECEC" }}
				>
					Update {product.name} Price
				</DialogTitle>
				<DialogContent sx={{ width: 500 }}>
					<Stack spacing={2}>
						<TextField
							id="outlined-basic"
							label="Price"
							value={newPrice}
							sx={{ mt: 1 }}
							onChange={(e) => setNewPrice(e.target.value)}
							fullWidth
						/>
						<Select
							value={newUnit}
							label="Unit"
							onChange={(e) => setNewUnit(e.target.value)}
						>
							<MenuItem value={Unit.NONE}>None</MenuItem>
							<MenuItem value={Unit.KILOGRAM}>per Kilogram</MenuItem>
							<MenuItem value={Unit.METER}>per Metre</MenuItem>
							<MenuItem value={Unit.LITRE}>per Litre</MenuItem>
						</Select>
						<FormControlLabel
							control={
								<Switch
									checked={newListed}
									onChange={(e) => {
										e.preventDefault();
										setNewListed((prev) => !prev);
									}}
								/>
							}
							label="Listed"
						/>
						<Button
							variant="contained"
							disabled={isLoading}
							onClick={handleUpdate}
						>
							{isLoading ? <CircularProgress size={25} /> : "Confirm"}
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
		</Paper>
	);
}
