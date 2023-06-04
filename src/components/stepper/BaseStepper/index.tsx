import { Box, Button, Paper } from "@mui/material";
import React from "react";

interface BaseStepperProps {
	children: React.ReactElement;
	handleConfirm?: () => void;
	buttonDisabled?: boolean;
}

export default function BaseStepper(props: BaseStepperProps) {
	const { children, handleConfirm, buttonDisabled } = props;
	return (
		<Paper sx={{ p: 2 }}>
			<Box
				sx={{
					justifyContent: "space-between",
					flexDirection: "column",
					minHeight: "250px",
					display: "flex",
				}}
			>
				<Box>{children}</Box>
				<Box
					sx={{
						justifyContent: "flex-end",
						display: "flex",
					}}
				>
					<Button
						variant="contained"
						onClick={handleConfirm}
						disabled={buttonDisabled}
					>
						Confirm
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
