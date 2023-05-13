import Link from "next/link";
import { Box, styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
	height: "70px",
	width: "180px",
	overflow: "hidden",
	display: "block",
}));

const Logo = () => {
	return (
		<LinkStyled
			sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			href="/"
		>
			<Box sx={{ marginLeft: "auto", marginTop: "10%" }}>
				<Image
					src="/images/logos/logo.png"
					alt="logo"
					height={120}
					width={160}
					priority
				/>
			</Box>
		</LinkStyled>
	);
};

export default Logo;
