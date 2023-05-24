import { useState } from "react";
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
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

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

function MyCards() {
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
			<CardHeader subheader={data.savedCards + " saved cards"} title="Cards" />
			<Divider />
			<Box p={3}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
							<Box display="flex" alignItems="center">
								<CardLogo
									src="https://umbria.network/assets/images/icon/bsclogo.png?v1"
									alt="Visa"
									sx={{ height: "50px", width: "50px" }}
								/>
								<Box>
									<Typography variant="h3" fontWeight="normal">
										•••• 6879
									</Typography>
									<Typography variant="subtitle2" color="#ff6961">
										Not Registered
										{/* <Typography component="span" color="text.primary">
											12/24
										</Typography> */}
									</Typography>
								</Box>
							</Box>
							<Box
								pt={3}
								display="flex"
								alignItems="center"
								justifyContent="space-between"
							>
								<FormControlLabel
									value="a"
									control={
										<Radio
											checked={selectedValue === "a"}
											onChange={handleChange}
											value="a"
											color="primary"
											name="primary-card"
										/>
									}
									label="Primary"
								/>
								<Tooltip arrow title="Remove this card">
									<IconButtonError onClick={() => handleDelete()}>
										<DeleteTwoToneIcon fontSize="small" />
									</IconButtonError>
								</Tooltip>
							</Box>
						</CardCc>
					</Grid>
					<Grid item xs={12} sm={6}>
						<CardCc sx={{ px: 2, pt: 2, pb: 1 }}>
							<Box display="flex" alignItems="center">
								<CardLogo
									src="https://assets-global.website-files.com/5f973c970bea5548ad4287ef/61e70d05f3c7146ab79e66bb_ethereum-eth.svg"
									alt="Visa"
									sx={{ height: "50px", width: "50px" }}
								/>
								<Box>
									<Typography variant="h3" fontWeight="normal">
										•••• 4634
									</Typography>
									<Typography variant="subtitle2" color="#42ba96">
										Registered
										{/* <Typography component="span" color="text.primary">
											6/22
										</Typography> */}
									</Typography>
								</Box>
							</Box>
							<Box
								pt={3}
								display="flex"
								alignItems="center"
								justifyContent="space-between"
							>
								<FormControlLabel
									value="b"
									control={
										<Radio
											checked={selectedValue === "b"}
											onChange={handleChange}
											value="b"
											color="primary"
											name="primary-card"
										/>
									}
									label="Primary"
								/>
								<Tooltip arrow title="Remove this card">
									<IconButtonError onClick={() => handleDelete()}>
										<DeleteTwoToneIcon fontSize="small" />
									</IconButtonError>
								</Tooltip>
							</Box>
						</CardCc>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Tooltip arrow title="Click to add a new card">
							<Card sx={{ border: "1px dashed black" }} elevation={0}>
								<CardActionArea sx={{ px: 1 }}>
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

export default MyCards;
