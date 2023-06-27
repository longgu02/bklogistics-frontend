import { useState, type ReactElement } from "react";
import {
	Grid,
	Box,
	Card,
	Typography,
	Stack,
	TextField,
	Container,
	Paper,
} from "@mui/material";
import Link from "next/link";
import PageContainer from "../../src/components/container/PageContainer";
import Logo from "../../src/layouts/full/shared/logo/Logo";
import BlankLayout from "../../src/layouts/blank/BlankLayout";
import CustomStepper from "../../src/components/stepper";
import RegisterFirstStep from "../../src/modules/register/RegisterFirstStep";
import RegisterSecondStep from "../../src/modules/register/RegisterSecondStep";
import RegisterThirdStep from "../../src/modules/register/RegisterThirdStep";
import { useAppSelector } from "../../src/redux/hooks";
import HeaderLayout from "../../src/layouts/header/HeaderLayout";

const Register = () => {
	const [finishedStep, setFinishedStep] = useState<number>(0);
	const { currentStep } = useAppSelector((state) => state.register);
	const handleNext = () => {};
	const handleStepClick = () => {};
	return (
		<PageContainer title="Register" description="this is Register page">
			<Box sx={{ backgroundColor: "#F5F7FA" }}>
				<Container maxWidth="lg">
					<Box display="flex" alignItems="center" justifyContent="center">
						<Logo />
					</Box>
					<Typography
						fontWeight="700"
						variant="h4"
						mb={1}
						sx={{ textAlign: "center", mb: 3 }}
					>
						KYC Register Form
					</Typography>
					<Box>
						<CustomStepper
							steps={[
								"Basic Information",
								"Contact Information",
								"Additional Information",
							]}
							activeStep={currentStep - 1}
							handleNext={handleNext}
							handleStepClick={handleStepClick}
							orientation="horizontal"
						/>
					</Box>
				</Container>
				<Box>
					<Grid container>
						<Grid item xs={4} sx={{ p: 3 }}>
							<RegisterFirstStep
								isBlur={currentStep < 1}
								isDone={currentStep > 1}
							/>
						</Grid>
						<Grid item xs={4} sx={{ p: 3 }}>
							<RegisterSecondStep
								isBlur={currentStep < 2}
								isDone={currentStep > 2}
							/>
						</Grid>
						<Grid item xs={4} sx={{ p: 3 }}>
							<RegisterThirdStep
								isBlur={currentStep < 3}
								isDone={currentStep > 3}
							/>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</PageContainer>
	);
};

export default Register;

Register.getLayout = function getLayout(page: ReactElement) {
	return <HeaderLayout>{page}</HeaderLayout>;
};
