import {
	Box,
	Button,
	CircularProgress,
	Collapse,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Grid,
	MenuItem,
	Paper,
	Chip,
	Select,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import FullLayout from "../../src/layouts/full/FullLayout";
import { useEffect, useState, type ReactElement } from "react";
import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import PriceList from "../../src/modules/pricing/PriceList";
import { PricingType } from "../../src/hooks/usePricingContract";
import WalletRequired from "../../src/layouts/full/auth/WalletRequired";
import { addListed, getListed } from "../../src/services/profile-api";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { Unit } from "../../src/types";
import {
	getMaterial,
	getProduct,
	getProductAndMaterial,
} from "../../src/services/product-api";
import usePricingContract from "../../src/hooks/usePricingContract";
import { ethers } from "ethers";
import useNotify from "../../src/hooks/useNotify";

// Get services -> Get on sale products

const TEST_PRODUCT = [
	{ productId: 1, name: "Cowhide", type: PricingType.MATERIAL },
	{ productId: 2, name: "Silver Necklace", type: PricingType.PRODUCT },
	{ productId: 5, name: "Yamaha Guitar", type: PricingType.PRODUCT },
	{ productId: 6, name: "Xbox Gamepad", type: PricingType.PRODUCT },
];

const ManageShipment = () => {
	const { address, chainId, signer } = useAppSelector((state) => state.wallet);
	const { successNotify, errorNotify } = useNotify();
	const [isOpen, setOpen] = useState<boolean>(false);
	const [newPrice, setNewPrice] = useState<String>("0");
	const [newUnit, setNewUnit] = useState<String>("0");
	const [newProduct, setNewProduct] = useState<string>("");
	const [isLoading, setLoading] = useState<boolean>(false);
	const [type, setType] = useState<PricingType>(PricingType.PRODUCT);
	const [filtered, setFiltered] = useState<any>([]);
	const [selectedProduct, setSelectedProduct] = useState<any>();
	const [allProducts, setAllProducts] = useState<
		Array<{
			productId?: number;
			materialId?: number;
			name: string;
			type: PricingType;
		}>
	>([]);
	const [allMaterials, setAllMaterials] = useState<
		Array<{
			productId: number;
			name: string;
			type: PricingType;
		}>
	>([]);
	const [products, setProducts] = useState<
		Array<{
			productId: number;
			name: string;
			type: PricingType;
		}>
	>([]);
	useEffect(() => {
		getListed(address)
			.then((res) => {
				let products: Array<{
					productId: number;
					name: string;
					type: PricingType;
				}> = [];
				res.products.map((product: { productId: number; name: string }) => {
					products.push({
						productId: product.productId,
						name: product.name,
						type: PricingType.PRODUCT,
					});
				});
				res.materials.map((material: { materialId: number; name: string }) => {
					products.push({
						productId: material.materialId,
						name: material.name,
						type: PricingType.MATERIAL,
					});
				});
				setProducts(products);
			})
			.catch((err) => {
				console.error(err);
			});
		// getMaterial(chainId)
		// 	.then((res) => {
		// 		setAllMaterials(res.materials);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		// getProduct(chainId)
		// 	.then((res) => {
		// 		setAllProducts(res.products);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		getProductAndMaterial(chainId).then((res: any) => {
			setAllProducts(res);
		});
	}, [address]);
	console.log("all: ", allProducts);
	const handleClose = () => {
		setOpen(false);
	};
	const handleClick = () => {
		setOpen((prev) => !prev);
	};

	const updatedListener = (contract: ethers.Contract) => {
		successNotify(
			`${selectedProduct.name} (id: ${
				selectedProduct.productId || selectedProduct.materialId
			}) has been listed`
		);
		if (selectedProduct.productId) {
			setProducts((prev) => [
				...prev,
				{
					productId: selectedProduct.productId,
					name: selectedProduct.name,
					type: PricingType.PRODUCT,
				},
			]);
		} else {
			setProducts((prev) => [
				...prev,
				{
					productId: selectedProduct.materialId,
					name: selectedProduct.name,
					type: PricingType.MATERIAL,
				},
			]);
		}
		setLoading(false);
		setOpen(false);
		setLoading(false);
		contract.removeAllListeners();
	};

	const handleAdd = async () => {
		if (signer) {
			setLoading(true);
			const { modifyPrice, contract } = usePricingContract(signer, chainId);
			if (selectedProduct.productId) {
				const receipt = modifyPrice(
					selectedProduct.productId,
					ethers.parseUnits(String(newPrice), "ether"),
					true,
					1, // 1 as product , 0 as material
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
				addListed(address, selectedProduct.productId, 1);
			} else {
				const receipt = modifyPrice(
					selectedProduct.materialId,
					ethers.parseUnits(String(newPrice), "ether"),
					true,
					0, // 1 as product , 0 as material
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
				addListed(address, selectedProduct.materialId, 0);
			}
		}
	};

	const handleSuggest = (e: any) => {
		setSelectedProduct(undefined);
		setNewProduct(e.target.value);
		let notExistedProduct;
		notExistedProduct = allProducts.filter(
			(product) =>
				products.find(
					(p) =>
						(p.productId === product.productId &&
							p.type === PricingType.PRODUCT) ||
						(p.productId === product.materialId &&
							p.type === PricingType.MATERIAL)
				) == undefined
		);

		let filter;

		filter = notExistedProduct.filter(
			(product) =>
				product.name.includes(e.target.value) ||
				product.productId == Number(e.target.value) ||
				product.materialId == Number(e.target.value)
		);
		setFiltered(filter);
	};
	return (
		<PageContainer title="Pricing" description="Pricing page">
			{/* <DashboardCard title="Pricing"> */}
			<Box>
				<Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
					<Typography variant="h4" sx={{ mb: 3 }}>
						Manage Pricing
					</Typography>
					<Button variant="contained" onClick={handleClick}>
						Add Product/Material
					</Button>
				</Box>
				<PriceList products={products} />
				<Dialog onClose={handleClose} open={isOpen}>
					<DialogTitle
						sx={{ textAlign: "center", mb: 2, backgroundColor: "#EBECEC" }}
					>
						Add Material/Product
					</DialogTitle>
					<DialogContent sx={{ width: 500 }}>
						<Stack spacing={2}>
							{/* <Select
								value={type}
								label="Type"
								onChange={(e: any) => setType(e.target.value)}
							>
								<MenuItem value={PricingType.MATERIAL}>Material</MenuItem>
								<MenuItem value={PricingType.PRODUCT}>Product</MenuItem>
							</Select> */}
							<TextField
								id="outlined-basic"
								label={type == PricingType.PRODUCT ? "Product" : "Material"}
								placeholder={`Choose your Product/Material`}
								value={newProduct}
								sx={{ mt: 1 }}
								onChange={handleSuggest}
								fullWidth
							/>
							<Collapse in={selectedProduct == undefined}>
								<Paper sx={{ mt: 0, maxHeight: 200, overflowY: "scroll" }}>
									{filtered.map((product: any) => (
										<Box
											onClick={() => {
												setSelectedProduct(product),
													setNewProduct(product.name);
											}}
										>
											<Grid
												container
												sx={{
													p: 2,
													"&:hover": {
														backgroundColor: "#F5F7FA",
														cursor: "pointer",
													},
												}}
											>
												<Grid item xs={3}>
													{product.productId || product.materialId}
												</Grid>
												<Grid item xs={6}>
													{product.name}
												</Grid>
												<Grid item xs={3}>
													<Chip
														label={product.productId ? "Product" : "Material"}
														size="small"
														sx={{
															px: "4px",
															color: "#fff",
															backgroundColor: product.productId
																? "#6ECCAF"
																: "#78A2CC",
														}}
													/>
												</Grid>
											</Grid>
										</Box>
									))}
								</Paper>
							</Collapse>
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
							<Button
								variant="contained"
								disabled={isLoading}
								onClick={handleAdd}
							>
								{isLoading ? <CircularProgress size={25} /> : "Confirm"}
							</Button>
						</Stack>
					</DialogContent>
				</Dialog>
			</Box>
			{/* </DashboardCard> */}
		</PageContainer>
	);
};

export default ManageShipment;

ManageShipment.getLayout = function getLayout(page: ReactElement) {
	return (
		<FullLayout>
			<WalletRequired>{page}</WalletRequired>
		</FullLayout>
	);
};
