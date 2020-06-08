import React from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
// import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 500;
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: drawerWidth,
  },
}));

export default function TemporaryDrawer({
  position,
  isOpen = false,
  close,
  drawerInfo = [],
}) {
  const classes = useStyles();

  return (
    <div className="drawer-container">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <CssBaseline /> */}
          <Drawer anchor={position} open={isOpen} onClose={() => close()}>
            <List>
              <h4 className="product-types-header">Product Types</h4>
              <Divider />
              <Link to="/" className="all-products">
                All Products
                <ChevronRightIcon />
              </Link>
              <Divider />
              {drawerInfo.map((info) => {
                return (
                  <ListItem key={info.id}>
                    {info}
                  </ListItem>
                );
              })}
            </List>
            <Divider />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
