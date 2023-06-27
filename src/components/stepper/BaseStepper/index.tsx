import { Box, Button, CircularProgress, Paper } from "@mui/material";
import React from "react";
import {
	nextStep,
	setNextDisabled,
} from "../../../redux/order/orderCreateSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
interface BaseStepperProps {
	children?: React.ReactNode;
	isDisabled: boolean;
	isBlur?: boolean;
	isDone?: boolean;
	isLoading?: boolean;
	handleConfirm?: () => void;
}

export default function BaseStepper(props: BaseStepperProps) {
	const dispatch = useAppDispatch();
	const { children, isDisabled, handleConfirm, isBlur, isDone, isLoading } =
		props;
	const handleNext = () => {
		dispatch(nextStep());
		// Logic...
		{
			handleConfirm ? handleConfirm() : null;
		}
		dispatch(setNextDisabled(true));
	};
	return (
		<Paper
			sx={{
				p: 2,
				filter: isBlur ? "blur(1.5px)" : "none",
				cursor: isBlur || isDone ? "not-allowed" : "auto",
				backgroundColor: isBlur || isDone ? "#F5F7FA" : "none",
			}}
		>
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
						onClick={handleNext}
						disabled={isDisabled || isBlur || isLoading}
					>
						{isLoading ? (
							<CircularProgress size={30} color="inherit" />
						) : (
							"Confirm"
						)}
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
function dispatch(arg0: { payload: undefined; type: "orderCreate/nextStep" }) {
	throw new Error("Function not implemented.");
}
