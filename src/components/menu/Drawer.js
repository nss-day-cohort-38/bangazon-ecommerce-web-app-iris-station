import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer({
  position = "left",
  isOpen = false,
  close,
  drawerInfo = [],
}) {
  const classes = useStyles();

  return (
    <div>
      <React.Fragment key={position}>
        <Drawer anchor={position} open={isOpen} onClose={() => close()}>
          <List>
            {drawerInfo.map((info, i) => {
              return (
                <ListItem key={i}>
                  {info}
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
