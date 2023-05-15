import { Box, TextField, Alert, Stack, Button } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import useRolesContract from "../../../hooks/useRolesContract";
import { ADMIN_ROLE, MEMBER_ROLE } from "../../../constants/role";
import * as React from "react";
import useNotify from "../../../hooks/useNotify";
import { ROLES_CONTRACT } from "../../../constants/address";
import { useAppDispatch } from "../../../redux/hooks";
import { setNextDisabled } from "../../../redux/order/orderCreateSlice";

export default function OrderFirstStep() {
	const { address, signer, provider } = useAppSelector((state) => state.wallet);
	const { finishedStep } = useAppSelector((state) => state.orderCreate);
	const { errorNotify } = useNotify();
	const [isValid, setValid] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();

	// const handleClick = async () => {
	// 	try {
	// 		// const filter = {
	// 		// 	address: ROLES_CONTRACT,
	// 		// 	topics: ["MemberAdded(address, uint256"]
	// 		// }
	// 		if (signer && address) {
	// 			const { hasRole, addMember } = useRolesContract(signer);
	// 			const _promise = await addMember(
	// 				"0xe7c58E20A32B2309B18549a43E6829D1126ADa2E"
	// 			);

	// 		}
	// 		// provider?.on(filter, (smth: any) => {
	// 		// 		console.log(smth);
	// 		// })
	// 	} catch (err: any) {
	// 		errorNotify(err.message);
	// 	}
	// };

	React.useEffect(() => {
		if (signer && address) {
			const { hasRole } = useRolesContract(signer);
			const _promise = hasRole(MEMBER_ROLE, address);
			console.log(_promise);
			_promise.then((res) => {
				console.log(res);
				console.log(address);
				setValid(res);
			});
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
		}
	}, [address]);

	const renderResult = () => {
		if (finishedStep == 0) {
			if (!address) {
				dispatch(setNextDisabled(true));
				return (
					<Alert severity="info" sx={{ backgroundColor: "#E5F6FD" }}>
						Please connect your wallet to verify
					</Alert>
				);
			} else {
				if (isValid) {
					dispatch(setNextDisabled(false));
					return (
						<Alert severity="success" sx={{ backgroundColor: "#EDF7ED" }}>
							Your wallet is verified
						</Alert>
					);
				} else {
					dispatch(setNextDisabled(true));
					return (
						<Alert severity="error" sx={{ backgroundColor: "#FDEDED" }}>
							Your wallet has not been verified, please register!
						</Alert>
					);
				}
			}
		} else {
			return (
				<Alert severity="success" sx={{ backgroundColor: "#EDF7ED" }}>
					Your wallet is verified
				</Alert>
			);
		}
	};

	return (
		<Box>
			{renderResult()}
			{/* {!address ? (
				<Alert severity="info" sx={{ backgroundColor: "#E5F6FD" }}>
					Please connect your wallet to verify
				</Alert>
			) :  {isValid ? <Alert severity="success" sx={{ backgroundColor: "#EDF7ED" }}>
			Your wallet is verified
		</Alert> :
			<Alert severity="error" sx={{ backgroundColor: "#FDEDED" }}>
				Your wallet has not been verified, please register!
			</Alert>
		
		}} */}

			{/* <Alert severity="warning" sx={{ backgroundColor: "#FFF4E5" }}>
				This is a warning alert — check it out!
			</Alert> */}
			{/* {signer && <Button onClick={handleClick}>Test</Button>} */}
		</Box>
	);
}
