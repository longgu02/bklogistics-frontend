import { useEffect, useState } from "react";
import {
	Box,
	Grid,
	Radio,
	FormControlLabel,
	Typography,
	Card,
	CardHeader,
	Divider,
	lighten,
	CardActionArea,
	CardContent,
	Tooltip,
	IconButton,
	Avatar,
	styled,
	alpha,
	CircularProgress,
	Button,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { Wallet } from "../../types";
import { formatAddress } from "../../utils";
import { useAppSelector } from "../../redux/hooks";
import { enqueueSnackbar } from "notistack";
import { errorNotify, successNotify } from "../../hooks/useNotify";
import useRolesContract from "../../hooks/useRolesContract";
import { MEMBER_ROLE } from "../../constants/role";
const AvatarAddWrapper = styled(Avatar)(
	({ theme }) => `
        background: white;
        color: ${theme.palette.primary};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardLogo = styled("img")(
	({ theme }) => `
      border-radius: "50%";
      margin-right: ${theme.spacing(2)};
`
);

// const CardAddAction = styled(Card)(
// 	({ theme }) => `
//         border: ${theme.palette.primary} dashed 1px;
//         height: 100%;
//         color: ${theme.palette.primary};
//         box-shadow: none;

//         .MuiCardActionArea-root {
//           height: 100%;
//           justify-content: center;
//           align-items: center;
//           display: flex;
//         }

//         .MuiTouchRipple-root {
//           opacity: .2;
//         }

//         &:hover {
//           border-color: ${alpha("#223354", 1.0)};
//         }
// `
// );

const IconButtonError = styled(IconButton)(
	({ theme }) => `
     background: ${theme.palette.primary};
     color: ${theme.palette.primary};
     padding: ${theme.spacing(0.5)};

     &:hover {
      background: ${theme.palette.primary};
     }
`
);

const CardCc = styled(Card)(
	({ theme }) => `
     border: 1px solid ${alpha("#223354", 0.3)};
     background: ${alpha("#223354", 0.05)};
     box-shadow: none;
`
);

interface AddressProps {
	// wallets: Array<Wallet>;
	currentAddress: string;
	wallets: Array<string>;
}

const WalletBox = (props: { address: string; currentAddress: string }) => {
	const { address, currentAddress } = props;
	const { signer, chainId } = useAppSelector((state) => state.wallet);
	const [isRegistered, setRegistered] = useState<boolean | undefined>();
	useEffect(() => {
		if (signer) {
			const { hasRole } = useRolesContract(signer, chainId);
			hasRole(MEMBER_ROLE, address)
				.then((result) => {
					setRegistered(result);
				})
				.catch((err) => errorNotify(enqueueSnackbar, `${err}`));
		}
	}, [signer, chainId]);

	const renderRegistered = () => {
		if (isRegistered == undefined) {
			return (
				<Box sx={{ display: "flex" }}>
					<Typography sx={{ mr: 1 }}>Checking</Typography>
					<CircularProgress size={20} />
				</Box>
			);
		} else if (isRegistered == true) {
			return (
				<Typography variant="subtitle2" color="#42ba96">
					Registered
				</Typography>
			);
		} else {
			return (
				<Typography variant="subtitle2" color="#ff6961">
					Pending
				</Typography>
			);
		}
	};

	// const handleChange = (event: any) => {
	// 	setSelectedValue(event.target.value);
	// };

	const handleRemove = () => {
		if (signer) {
			const { contract, renounceMember } = useRolesContract(signer, chainId);
			renounceMember(address)
				.then((result) => {
					contract.on(
						"MemberRemoved",
						(_account: string, _removedDate: any, event) => {
							successNotify(enqueueSnackbar, "Wallet Removed");
							setRegistered(false);
							event.removeListener();
						}
					);
				})
				.catch((err) => errorNotify(enqueueSnackbar, `${err}`));
		} else {
			errorNotify(enqueueSnackbar, "Please connect your wallet");
		}
	};
	return (
		<>
			<CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
				<Box display="flex" alignItems="center">
					<CardLogo
						src="https://umbria.network/assets/images/icon/bsclogo.png?v1"
						alt="Visa"
						sx={{ height: "50px", width: "50px" }}
					/>
					<Box>
						<Typography variant="h3" fontWeight="normal">
							{formatAddress(address, 4)}
						</Typography>
						{renderRegistered()}
					</Box>
				</Box>
				<Box
					pt={3}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
				>
					{currentAddress.toLowerCase() == address.toLowerCase() ? (
						<Typography>Current</Typography>
					) : (
						<Typography />
					)}
					<Tooltip arrow title="Remove this wallet">
						<IconButtonError onClick={() => handleRemove()}>
							<DeleteTwoToneIcon fontSize="small" />
						</IconButtonError>
					</Tooltip>
				</Box>
			</CardCc>
		</>
	);
};

function Wallets(props: AddressProps) {
	const { wallets, currentAddress } = props;
	const data = {
		savedCards: 7,
	};

	const [selectedValue, setSelectedValue] = useState("a");

	const handleChange = (event: any) => {
		setSelectedValue(event.target.value);
	};

	const handleDelete = () => {};

	return (
		<Card elevation={2}>
			<CardHeader
				subheader={
					wallets.length + ` saved wallet${wallets.length > 1 ? "s" : ""}`
				}
				title="Wallets"
			/>
			<Divider />
			<Box p={3}>
				<Grid container spacing={3}>
					{wallets.map((address) => (
						<Grid key={address} item xs={12} sm={6}>
							<WalletBox address={address} currentAddress={currentAddress} />
						</Grid>
					))}
					<Grid item xs={12} sm={6}>
						<Tooltip arrow title="Click to add a new card">
							<Card
								sx={{
									height: "100%",
									border: "1px dashed black",
								}}
								elevation={0}
							>
								<CardActionArea sx={{ px: 1, height: "100%" }}>
									<CardContent>
										<AvatarAddWrapper sx={{ margin: "auto" }}>
											<AddTwoToneIcon
												fontSize="large"
												sx={{ color: "#556cd6" }}
											/>
										</AvatarAddWrapper>
									</CardContent>
								</CardActionArea>
							</Card>
						</Tooltip>
					</Grid>
				</Grid>
			</Box>
		</Card>
	);
}

export default Wallets;
