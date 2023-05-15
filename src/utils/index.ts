export const formatAddress: (
	arg0: string,
	arg1: number
) => string | undefined = (address: string, fractionDigits: number = 3) => {
	try {
		return (
			address.slice(0, fractionDigits) + "..." + address.slice(-fractionDigits)
		);
	} catch (error) {
		return undefined;
	}
};
