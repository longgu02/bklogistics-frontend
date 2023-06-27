import React from "react";
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useAppSelector } from "../../../redux/hooks";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
	const { pathname } = useRouter();
	const { isAdmin } = useAppSelector((state) => state.wallet);
	const pathDirect = pathname;

	return (
		<Box sx={{ px: 3 }}>
			<List sx={{ pt: 0 }} className="sidebarNav" component="div">
				{Menuitems.map((item) => {
					// {/********SubHeader**********/}
					if (item.isAdmin && !isAdmin) {
						return;
					}
					if (item.subheader) {
						return <NavGroup item={item} key={item.subheader} />;

						// {/********If Sub Menu**********/}
						/* eslint no-else-return: "off" */
					} else {
						return (
							<NavItem
								item={item}
								key={item.id}
								pathDirect={pathDirect}
								onClick={toggleMobileSidebar}
							/>
						);
					}
				})}
			</List>
		</Box>
	);
};
export default SidebarItems;
