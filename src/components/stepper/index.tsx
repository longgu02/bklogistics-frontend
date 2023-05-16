import * as React from "react";
import {
	Box,
	Stepper,
	Step,
	StepLabel,
	Button,
	Typography,
	Grid,
	StepButton,
} from "@mui/material";
// const steps = [
// 	"Select campaign settings",
// 	"Create an ad group",
// 	"Create an ad",
// ];

interface StepperProps {
	steps: Array<string>;
	activeStep: number;
	optionalStep?: Array<number>;
	skipStep?: Array<Number>;
	isMobile?: boolean;
	children: React.ReactElement;
	isNextDisabled?: boolean;
	handleNext?: () => void;
	handleBack?: () => void;
	handleSkip?: () => void;
	handleStepClick: (arg0: number) => void;
}

export default function CustomStepper(props: StepperProps) {
	const {
		steps,
		activeStep,
		children,
		isMobile,
		optionalStep,
		skipStep,
		isNextDisabled,
		handleNext,
		handleBack,
		handleSkip,
		handleStepClick,
	} = props;
	const [selectedStep, setSelectedStep] = React.useState<number>(activeStep);
	const customStyle = {
		fontSize: "30px",
	};
	const isStepOptional = (step: number) => {
		if (optionalStep === undefined) return false;
		return optionalStep.indexOf(step) !== -1;
	};

	const isStepSkipped = (step: number) => {
		if (skipStep === undefined) return false;
		return skipStep?.indexOf(step) !== -1;
	};

	const handleSelectStep = (step: number) => {
		handleStepClick(step);
		setSelectedStep(step);
	};

	// const handleNext = () => {
	// 	let newSkipped = skipped;
	// 	if (isStepSkipped(activeStep)) {
	// 		newSkipped = new Set(newSkipped.values());
	// 		newSkipped.delete(activeStep);
	// 	}

	// 	setActiveStep((prevActiveStep) => prevActiveStep + 1);
	// 	setSkipped(newSkipped);
	// };

	// const handleBack = () => {
	// 	setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// };

	// const handleSkip = () => {
	// 	if (!isStepOptional(activeStep)) {
	// 		// You probably want to guard against something like this,
	// 		// it should never occur unless someone's actively trying to break something.
	// 		throw new Error("You can't skip a step that isn't optional.");
	// 	}

	// 	setActiveStep((prevActiveStep) => prevActiveStep + 1);
	// 	setSkipped((prevSkipped) => {
	// 		const newSkipped = new Set(prevSkipped.values());
	// 		newSkipped.add(activeStep);
	// 		return newSkipped;
	// 	});
	// };

	// const handleReset = () => {
	// 	setActiveStep(0);
	// };

	return (
		<Box sx={{ width: "100%" }}>
			{isMobile ? (
				<Box>Mobile</Box>
			) : (
				<Grid container>
					<Grid item xs={4}>
						<Stepper activeStep={activeStep} orientation="vertical">
							{steps.map((label, index) => {
								const stepProps: { completed?: boolean } = {};
								const labelProps: {
									optional?: React.ReactNode;
								} = {};
								if (isStepOptional(index)) {
									labelProps.optional = (
										<Typography variant="caption">Optional</Typography>
									);
								}
								if (isStepSkipped(index)) {
									stepProps.completed = false;
								}
								return (
									<Step
										key={label}
										// sx={{ fontSize: "24px" }}
										// onClick={}
										sx={{ fontSize: 30 }}
										{...stepProps}
									>
										<StepButton
											color="inherit"
											sx={{ width: "fit-content" }}
											onClick={() => handleSelectStep(index + 1)}
										>
											<StepLabel
												// sx={{ label: { fontSize: 30 } }}
												classes={{ label: "30px" }}
												{...labelProps}
											>
												<Typography variant="subtitle1" sx={{ fontSize: 16 }}>
													{label}
												</Typography>
											</StepLabel>
										</StepButton>
									</Step>
								);
							})}
						</Stepper>
					</Grid>
					<Grid item xs={8}>
						{children}
					</Grid>
				</Grid>
			)}
			<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
				{handleBack && (
					<Button
						color="inherit"
						disabled={activeStep === 0}
						onClick={handleBack}
						sx={{ mr: 1 }}
					>
						Back
					</Button>
				)}

				<Box sx={{ flex: "1 1 auto" }} />
				{isStepOptional(activeStep) && (
					<Button
						color="inherit"
						variant="contained"
						onClick={handleSkip}
						sx={{ mr: 1 }}
					>
						Skip
					</Button>
				)}
				<Button
					variant="contained"
					onClick={handleNext}
					disabled={selectedStep != activeStep || isNextDisabled}
				>
					{activeStep === steps.length - 1 ? "Finish" : "Next"}
				</Button>
			</Box>
		</Box>
	);
}
