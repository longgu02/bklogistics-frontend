import {
	IconAperture,
	IconCopy,
	IconLayoutDashboard,
	IconLogin,
	IconMoodHappy,
	IconTypography,
	IconUserPlus,
	IconUser,
	IconCurrencyDollar,
	IconUserCheck,
} from "@tabler/icons-react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SourceIcon from "@mui/icons-material/Source";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { uniqueId } from "lodash";

const Menuitems = [
	{
		navlabel: true,
		subheader: "Manage",
		isAdmin: true,
	},

	{
		id: uniqueId(),
		title: "Request Monitoring",
		icon: IconUserCheck,
		href: "/admin",
		isAdmin: true,
	},
	{
		navlabel: true,
		subheader: "Home",
	},

	{
		id: uniqueId(),
		title: "Dashboard",
		icon: IconLayoutDashboard,
		href: "/",
	},
	{
		navlabel: true,
		subheader: "Order",
	},
	{
		id: uniqueId(),
		title: "Create Order",
		icon: ListAltIcon,
		href: "/order/create",
	},
	{
		id: uniqueId(),
		title: "Manage Order",
		icon: SourceIcon,
		href: "/order/manage",
	},
	{
		navlabel: true,
		subheader: "Shipment",
	},
	{
		id: uniqueId(),
		title: "Create Shipment",
		icon: NoteAddIcon,
		href: "/shipment/create",
	},
	{
		id: uniqueId(),
		title: "Manage Shipment",
		icon: LocalShippingIcon,
		href: "/shipment/manage",
	},
	{
		navlabel: true,
		subheader: "Personal",
	},
	{
		id: uniqueId(),
		title: "Register",
		icon: IconUserPlus,
		href: "/register",
	},
	{
		id: uniqueId(),
		title: "Pricing",
		icon: IconCurrencyDollar,
		href: "/pricing",
	},
	{
		navlabel: true,
		subheader: "Extra",
	},
	{
		id: uniqueId(),
		title: "Icons",
		icon: IconMoodHappy,
		href: "/icons",
	},
	{
		id: uniqueId(),
		title: "Sample Page",
		icon: IconAperture,
		href: "/sample-page",
	},
];

export default Menuitems;
