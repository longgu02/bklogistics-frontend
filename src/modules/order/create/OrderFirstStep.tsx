import { Box, Alert } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import useRolesContract from "../../../hooks/useRolesContract";
import { MEMBER_ROLE } from "../../../constants/role";
import * as React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setNextDisabled } from "../../../redux/order/orderCreateSlice";
import { NETWORKS } from "../../../constants/chain";

export default function OrderFirstStep() {
	const { address, signer, chainId } = useAppSelector((state) => state.wallet);
	const { finishedStep } = useAppSelector((state) => state.orderCreate);
	const [isValid, setValid] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		if (
			chainId == NETWORKS.GOERLI_TESTNET.chainId
			// ||
			// chainId == NETWORKS.BSC_TESTNET.chainId
		) {
			if (signer && address) {
				const { hasRole } = useRolesContract(signer, chainId);
				const _promise = hasRole(MEMBER_ROLE, address);
				console.log(_promise);
				_promise
					.then((res) => {
						console.log(res);
						console.log(address);
						setValid(res);
					})
					.catch((err) => {
						console.log(err);
					});
			}
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
				if (
					chainId == NETWORKS.GOERLI_TESTNET.chainId ||
					chainId == NETWORKS.BSC_TESTNET.chainId
				) {
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
				} else {
					return (
						<Alert severity="warning" sx={{ backgroundColor: "#FFF4E5" }}>
							Please switch to Goerli Testnet or BSC Testnet!
						</Alert>
					);
				}
			}
		}
	};

	return <Box>{renderResult()}</Box>;
}
