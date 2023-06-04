enum Unit {
	none = 1,
	kilogram,
	meter,
	litter,
}

export interface Wallet {
	address: string;
	isRegistered: boolean;
	// isPending: boolean;
}

export interface Profile {
	_id: string;
	address: string;
	isMember: boolean;
	mail: string;
	registeredDate: string;
	material: Array<string>;
	product: Array<number>;
}

export interface Material {
	_id: string;
	name: string;
	unit: Unit;
}
