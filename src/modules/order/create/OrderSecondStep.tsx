import {
	Box,
	TextField,
	Button,
	Typography,
	IconButton,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	Collapse,
} from "@mui/material";
import Autocomplete, {
	AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	nextStep,
	setNextDisabled,
} from "../../../redux/order/orderCreateSlice";
import useNotify from "../../../hooks/useNotify";
import BaseStepper from "../../../components/stepper/BaseStepper";
import { Product, Material, Unit, Rq_Material } from "../../../types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { addOrder_Product } from "../../../redux/order/orderSlice";
import useProductContract from "../../../hooks/useProductContract";
import usePricingContract from "../../../hooks/usePricingContract";
const ProductList: Product[] = [
	{
		id: 1,
		name: "Leather Jacket",
		price: 19.99,
		rq_material: [
			{
				material: {
					material_id: 1,
					name: "Cotton",
					unit: [Unit.KILOGRAM],
					price: 8.99,
				},
				quantity: 0.5, // Quantity required in kilograms
			},
		],
		description: "A comfortable and stylish t-shirt.",
	},
	{
		id: 1,
		name: "T-Shirt",
		price: 19.99,
		rq_material: [
			{
				material: {
					material_id: 1,
					name: "Cotton",
					unit: [Unit.KILOGRAM],
					price: 8.99,
				},
				quantity: 0.5, // Quantity required in kilograms
			},
		],
		description: "A comfortable and stylish t-shirt.",
	},
	{
		id: 2,
		name: "Jeans",
		price: 49.99,
		rq_material: [
			{
				material: {
					material_id: 2,
					name: "Denim",
					unit: [Unit.METER],
					price: 12.99,
				},
				quantity: 2, // Quantity required in meters
			},
		],
		description: "Classic denim jeans for a trendy look.",
	},
	{
		id: 3,
		name: "Dress",
		price: 39.99,
		rq_material: [
			{
				material: {
					material_id: 1,
					name: "Cotton",
					unit: [Unit.KILOGRAM],
					price: 8.99,
				},
				quantity: 1, // Quantity required in kilograms
			},
			{
				material: {
					material_id: 3,
					name: "Silk",
					unit: [Unit.METER],
					price: 24.99,
				},
				quantity: 1.5, // Quantity required in meters
			},
		],
		description: "Elegant and feminine dress made from cotton and silk.",
	},
	{
		id: 4,
		name: "Jacket",
		price: 79.99,
		rq_material: [
			{
				material: {
					material_id: 4,
					name: "Leather",
					unit: [Unit.METER],
					price: 49.99,
				},
				quantity: 1.2, // Quantity required in meters
			},
			{
				material: {
					material_id: 1,
					name: "Cotton",
					unit: [Unit.KILOGRAM],
					price: 8.99,
				},
				quantity: 0.3, // Quantity required in kilograms
			},
		],
		description: "Stylish leather jacket with a cotton lining.",
	},
	{
		id: 5,
		name: "Sweater",
		price: 29.99,
		rq_material: [
			{
				material: {
					material_id: 5,
					name: "Wool",
					unit: [Unit.KILOGRAM],
					price: 15.99,
				},
				quantity: 0.8, // Quantity required in kilograms
			},
		],
		description: "Warm and cozy sweater made from soft wool.",
	},
	{
		id: 6,
		name: "Skirt",
		price: 34.99,
		rq_material: [
			{
				material: {
					material_id: 3,
					name: "Silk",
					unit: [Unit.METER],
					price: 24.99,
				},
				quantity: 1.2, // Quantity required in meters
			},
		],
		description: "Flowy silk skirt for a stylish and elegant look.",
	},
];

export default function OrderSecondStep() {
	const dispatch = useAppDispatch();
	const finishedStep = useAppSelector(
		(state) => state.orderCreate.finishedStep
	);
	const { signer, chainId } = useAppSelector((state) => state.wallet);
	const { successNotify, errorNotify } = useNotify();

	const [product, setProduct] = React.useState<Product>();
	const [rqMaterial, setRqMaterial] = React.useState<Rq_Material>();
	const [material, setMaterial] = React.useState<Material>();
	const [requiredMaterial, setRequiredMaterial] = React.useState<any>();
	const [option, setOption] = React.useState<string>("");
	const handleAddProduct = () => {
		if (product) dispatch(addOrder_Product(product));
	};
	const Choose = () => {
		return (
			<>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						marginY: 20,
					}}
				>
					<Button variant="contained" onClick={() => setOption("opt1")}>
						Select Product
					</Button>
					<Typography variant="h6">OR</Typography>
					<Button variant="contained" onClick={() => setOption("opt2")}>
						Create new Product
					</Button>
				</Box>
			</>
		);
	};

	const OPT1 = () => {
		const [inputValue, setInputValue] = React.useState("");
		return (
			<>
				<IconButton
					onClick={() => {
						setOption("");
						if (product) {
							setProduct();
						}
					}}
				>
					<ArrowBackIosNewIcon />
				</IconButton>
				<Autocomplete
					options={ProductList}
					getOptionLabel={(item) => `${item.name}`}
					value={product}
					onChange={async (event, value) => {
						console.log(value);
						if (value) {
							let result: any = [];
							setProduct(value);
							if (signer) {
								const { getRequiredMaterial } = useProductContract(
									signer,
									chainId
								);
								await getRequiredMaterial(1)
									.then((res) => {
										console.log(res);
										res.map(async (item: any) => {
											let name;
											const { getMaterial } = useProductContract(
												signer,
												chainId
											);
											await getMaterial(Number(item[0])).then((response) => {
												console.log(response);
												name = String(response[1]);
												result.push({
													materialId: Number(item[0]),
													name: name,
													quantity: Number(item[1]),
													unit: Number(item[2]),
												});
											});
										});
										setRequiredMaterial(result);
									})
									.catch((err) => {
										console.log(err);
									});
							}
						}
					}}
					// inputValue={inputValue}
					// onInputChange={(event, newInputValue) => {
					//   setInputValue(newInputValue);
					// }}
					isOptionEqualToValue={(option, value) =>
						option?.id.toString() === value?.id.toString()
					}
					renderInput={(params) => (
						<TextField {...params} label="Product" required />
					)}
					sx={{ marginTop: 2 }}
				/>
				<Collapse in={product ? true : false} timeout="auto" unmountOnExit>
					<Typography variant="h4">Require Materials:</Typography>
					<TableContainer sx={{ marginTop: 2 }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Quantity</TableCell>
									<TableCell>Unit</TableCell>
									<TableCell>Price/Unit</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{requiredMaterial?.map((material: any) => {
									return (
										<TableRow>
											<TableCell>{material.materialId}</TableCell>
											<TableCell>{material.name}</TableCell>
											<TableCell>{material.quantity}</TableCell>
											<TableCell>{material.unit}</TableCell>
											<TableCell>{"hihi"}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
					<Typography variant="body1" sx={{ marginTop: 2 }}>
						Description: {product?.description}
					</Typography>
					<Typography variant="body1">
						Price of product: {product?.price}
					</Typography>
				</Collapse>
			</>
		);
	};
	const OPT2 = () => {
		return (
			<>
				<IconButton
					onClick={() => {
						setOption("");
						if (product) {
							setProduct();
						}
					}}
				>
					<ArrowBackIosNewIcon />
				</IconButton>
			</>
		);
	};
	return (
		<BaseStepper
			isDisabled={product ? false : true}
			handleConfirm={handleAddProduct}
		>
			{option === "" ? <Choose /> : option === "opt1" ? <OPT1 /> : <OPT2 />}
		</BaseStepper>
	);
}
