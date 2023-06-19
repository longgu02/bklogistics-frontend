export enum Unit {
	none = 1,
	KILOGRAM = "kg",
	TONNE = "t",
	METER = "m",
}
export enum Status {
	PENDING = "pending",
	IN_PROGRESS = "progress",
	SUCCESS = "success",
	FAILED = "failed",
	CANCELED = "cancelled",
}
export enum Role {
	supplier = "Supplier",
	manufacturer = "Manufacturer",
}
export interface Wallet {
	address: string;
	isRegistered: boolean;
	// isPending: boolean;
}

export interface Profile {
	_id?: string;
	profile_id: number;
	walletAddress: string;
	image: string;
	companyName: string;
	shippingAddress: string;
	deliveryAddress: string;
	phoneNumber: string;
	email: string;
	registeredDate: string;
	description: string;
	website?: string;
	listedProduct?: Material[];
	listedMaterial?: Product[];
}

export interface Material {
	material_id: number;
	name: string;
	unit: Unit[];
	price: number;
}

export interface Product {
	id: number;
	name: string;
	price: number;
	rq_material: Rq_Material[];
	description?: string; // Change the type to an array of Unit or null
}

export interface Rq_Material {
	material: Material;
	quantity: number;
}
export interface Rq_Product {
	product: Product;
	quantity: number;
}
export interface Order_Stakeholder {
	addressWallet: string;
	role: string;
	name: string;
	address: string;
	supplier_material?: Rq_Material[];
	manufacturer_product?: Rq_Product[];
	validation?: boolean;
}

export interface Order {
	product: Product;
	status: Status;
	is_paid?: boolean;
	deposit_amount: number;
	customer_address: string;
	order_stakeholder: Order_Stakeholder[];
}
