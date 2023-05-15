import { Box } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import CustomStepper from "../../../src/components/stepper";
import OrderFirstStep from "../../../src/modules/order/create/OrderFirstStep";
import OrderSecondStep from "../../../src/modules/order/create/OrderSecondStep";
import OrderThirdStep from "../../../src/modules/order/create/OrderThirdStep";
import OrderFourthStep from "../../../src/modules/order/create/OrderFourthStep";
import { useAppDispatch, useAppSelector } from "../../../src/redux/hooks";
import {
	nextStep,
	selectStep,
	setNextDisabled,
} from "../../../src/redux/order/orderCreateSlice";

const CreateOrder = () => {
	const { currentStep, finishedStep, selectedStep, isNextDisabled } =
		useAppSelector((state) => state.orderCreate);
	const dispatch = useAppDispatch();
	console.log(currentStep);
	const renderStep = (step: number) => {
		switch (step) {
			case 1:
				return <OrderFirstStep />;
			case 2:
				return <OrderSecondStep />;
			case 3:
				return <OrderThirdStep />;
			case 4:
				return <OrderFourthStep />;
		}
	};

	const handleNext = () => {
		dispatch(nextStep());
		// Logic...
		dispatch(setNextDisabled(true));
	};

	const handleStepClick = (step: number) => {
		dispatch(selectStep(step));
	};

	return (
		<PageContainer title="Create Order" description="Create Order page">
			<DashboardCard title="Create Order">
				<Box>
					<CustomStepper
						steps={[
							"Check wallet address validation",
							"Choose product and order's note",
							"Add Suppliers and Manufacturers",
							"Deposit",
						]}
						activeStep={finishedStep}
						handleNext={handleNext}
						handleStepClick={handleStepClick}
						isNextDisabled={isNextDisabled}
					>
						<Box>{renderStep(selectedStep)}</Box>
					</CustomStepper>
				</Box>
			</DashboardCard>
		</PageContainer>
	);
};

export default CreateOrder;

CreateOrder.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
