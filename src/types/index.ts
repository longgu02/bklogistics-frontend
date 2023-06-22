export enum Unit {
  NONE = 0,
  KILOGRAM = 1,
  METER = 2,
  LITRE= 3,
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
  wallet_address: string;
  contact_address: string;
  phone_number: string;
  name: string;
  email: string;
  isMember?: boolean;
  registeredDate?: string;
  materialList?: Item[];
  productList?: Product[];
}

export interface Material {
  materialId: number;
  name: string;
}

export interface Item {
  id: number;
  price: number;
}

export interface Product {
  inputValue?:string;
  id: number;
  name: string;
  description?: string; // Change the type to an array of Unit or null
}

export interface RequireMaterial {
  materialId: number;
  name: string;
  quantity: number;
  unit: number;
}

export interface Order {
  product: Product;
  requireMaterial: RequireMaterial[];
  status: Status;
  is_paid?: boolean;
  deposit_amount: number;
  customer_address: string;
  suppliers: Holder[];
  manufacturer: Holder[];
}

export interface Holder {
  address: string;
  item: Item[];
}