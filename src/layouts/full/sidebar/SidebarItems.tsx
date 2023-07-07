import React from "react";
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useAppSelector } from "../../../redux/hooks";
import useRolesContract from "../../../hooks/useRolesContract";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const { pathname } = useRouter();
  const { isAdmin, address, signer, chainId } = useAppSelector(
    (state) => state.wallet
  );
  const pathDirect = pathname;
  const checkCarrier = async () => {
    if (signer) {
      const { isCarrier } = useRolesContract(signer, chainId);
      const result = await isCarrier(address);
      return result;
    }
  };

  const [isCarrier, setCarrier] = React.useState<boolean>(false);

  const fetchData = async () => {
    const isCheck: boolean = await checkCarrier();
    console.log(
      "🚀 ~ file: SidebarItems.tsx:29 ~ fetchData ~ isCheck:",
      isCheck
    );
    setCarrier(isCheck);
  };
  fetchData();

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.isAdmin && !isAdmin) {
            return;
          }
          if (item.isCarrier && !isCarrier) return;
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
