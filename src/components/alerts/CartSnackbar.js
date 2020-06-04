// import React from "react";
// import Snackbar from "@material-ui/core/Snackbar";
// import Slide from "@material-ui/core/Slide";
// import { Message } from "semantic-ui-react";

// const CartSnackBar = ({ message, positive = false, negative = false }) => {
//   return (
//     <Snackbar
//       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       open={message ? true : false}
//       autoHideDuration={6000}
//       TransitionComponent={(props) => <Slide {...props} direction="up" />}
//     >
//       <Message positive={positive} negative={negative}>
//         {message}
//       </Message>
//     </Snackbar>
//   );
// };

// export default CartSnackBar;

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function ConsecutiveSnackbars({
  message,
  negative = false,
  positive = true,
}) {
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  useEffect(() => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const classes = useStyles();
  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      onExited={handleExited}
      message={message}
      action={
        <>
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </>
      }
    />
  );
}
