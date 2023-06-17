import { Box, Stack, Typography } from "@mui/material";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import Link from "next/link";
import BaseStepper from "../../components/stepper/BaseStepper";
import {
	AdditionalInfo,
	updateThirdStep,
} from "../../redux/authentication/registerSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useImmer } from "use-immer";
import { set } from "lodash";
import { useEffect } from "react";

interface RegisterFirstStepProps {
	isBlur?: boolean;
	isDone: boolean;
}

interface ErrorAdditionalInfo {
	profileImage?: string;
	coverImage?: string;
	description?: string;
}

export default function RegisterThirdStep(props: RegisterFirstStepProps) {
	const { isBlur, isDone } = props;
	const [additionalInfo, setAdditionalInfo] = useImmer<AdditionalInfo>({
		profileImage: "",
		coverImage: "",
		description: "",
	});

	const [error, setError] = useImmer<ErrorAdditionalInfo>({});
	const dispatch = useAppDispatch();
	const handleConfirm = () => {
		dispatch(updateThirdStep(additionalInfo));
	};

	useEffect(() => {
		if (!isBlur && !isDone) {
			if (
				additionalInfo.description.trim() === "" ||
				additionalInfo.description == undefined
			) {
				setError((draft) => {
					draft.description = "Please provide a description.";
				});
			} else {
				setError((draft) => {
					draft.description = undefined;
				});
			}
		}
	}, [additionalInfo]);

	return (
		<BaseStepper
			isDisabled={
				Object.keys(additionalInfo).some(
					(key) =>
						additionalInfo[key as keyof AdditionalInfo] === "" ||
						typeof additionalInfo[key as keyof AdditionalInfo] === "undefined"
				) || isDone
			}
			isBlur={isBlur}
			handleConfirm={handleConfirm}
			isDone={isDone}
		>
			<Box>
				<Stack mb={3}>
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="name"
						mb="5px"
					>
						Profile Image
					</Typography>
					<CustomTextField
						id="profile-image"
						variant="outlined"
						fullWidth
						value={additionalInfo.profileImage}
						onChange={(e: any) =>
							setAdditionalInfo((draft) => {
								draft.profileImage = e.target.value;
							})
						}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						disabled={isBlur || isDone}
					/>

					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="email"
						mb="5px"
						mt="25px"
					>
						Cover Image
					</Typography>
					<CustomTextField
						id="cover-image"
						variant="outlined"
						fullWidth
						value={additionalInfo.coverImage}
						onChange={(e: any) =>
							setAdditionalInfo((draft) => {
								draft.coverImage = e.target.value;
							})
						}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						disabled={isBlur || isDone}
					/>
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="name"
						mb="5px"
						mt="25px"
					>
						Description
					</Typography>
					<CustomTextField
						id="Description"
						variant="outlined"
						multiline
						rows={5}
						fullWidth
						value={additionalInfo.description}
						onChange={(e: any) =>
							setAdditionalInfo((draft) => {
								draft.description = e.target.value;
							})
						}
						helperText={error.description}
						error={error.description}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						disabled={isBlur || isDone}
					/>
				</Stack>
			</Box>
		</BaseStepper>
	);
}
