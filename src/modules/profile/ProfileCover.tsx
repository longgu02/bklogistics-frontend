import PropTypes from "prop-types";
import {
	Box,
	Typography,
	Card,
	Avatar,
	CardMedia,
	Button,
	IconButton,
	Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import { Profile } from "../../types";

const Input = styled("input")({
	display: "none",
});

const AvatarWrapper = styled(Card)(
	({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
	({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: white;
      color: ${theme.palette.primary};
      box-shadow: ${theme.palette.secondary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.palette.primary};
      }
    }
`
);

const CardCover = styled(Card)(
	({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
	({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = (props: { user?: Profile }) => {
	const { user } = props;
	return (
		<>
			{user ? (
				<Box>
					<CardCover>
						<CardMedia
							image={
								"https://img.freepik.com/premium-vector/aesthetic-pastel-gradient-blue-purple-gradient-wallpaper-illustration-perfect-backdrop-wallpaper-background-banner-cover_565280-1124.jpg"
							}
						/>
						<CardCoverAction>
							<Input accept="image/*" id="change-cover" multiple type="file" />
						</CardCoverAction>
					</CardCover>
					<AvatarWrapper>
						<Avatar variant="rounded" alt={user.companyName} src={user.image} />
						<ButtonUploadWrapper>
							<Input
								accept="image/*"
								id="icon-button-file"
								name="icon-button-file"
								type="file"
							/>
							<label htmlFor="icon-button-file">
								<IconButton component="span" color="primary">
									<UploadTwoToneIcon />
								</IconButton>
							</label>
						</ButtonUploadWrapper>
					</AvatarWrapper>
					<Box py={2} pl={2} mb={3}>
						<Typography gutterBottom variant="h4">
							{user.companyName}
						</Typography>
						<Typography variant="subtitle2">{user.description}</Typography>
						<Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
							<span style={{ fontWeight: 600 }}>Email: </span> {user.email} |
							<span style={{ fontWeight: 600 }}>Tel: </span>
							{user.phoneNumber}
						</Typography>
						<Typography variant="subtitle2" color="text.primary">
							<span style={{ fontWeight: 600 }}>Shipping Address: </span>
							{user.shippingAddress}
						</Typography>
						<Typography sx={{ pb: 2 }} variant="subtitle2" color="text.primary">
							<span style={{ fontWeight: 600 }}>Delivery Address: </span>
							{user.deliveryAddress}
						</Typography>
						<Box
							display={{ xs: "block", md: "flex" }}
							alignItems="center"
							justifyContent="space-between"
						>
							<Box>
								<Button size="small" variant="outlined" href={user.website}>
									View website
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			) : (
				<Box>
					<Skeleton
						animation="wave"
						variant="rectangular"
						height={150}
						width="100%"
					/>
					<Skeleton
						animation="wave"
						variant="circular"
						width={200}
						height={200}
						sx={{ ml: 3, mt: -10 }}
					/>
					<Skeleton
						animation="wave"
						variant="rectangular"
						height={80}
						width="100%"
						sx={{ mt: 2 }}
					/>
					<Skeleton
						animation="wave"
						variant="rectangular"
						height={80}
						width="50%"
						sx={{ mt: 2 }}
					/>
					<Skeleton
						animation="wave"
						variant="rectangular"
						height={80}
						width="50%"
						sx={{ mt: 2 }}
					/>
				</Box>
			)}
		</>
	);
};

ProfileCover.propTypes = {
	// @ts-ignore
	user: PropTypes.object.isRequired,
};

export default ProfileCover;
