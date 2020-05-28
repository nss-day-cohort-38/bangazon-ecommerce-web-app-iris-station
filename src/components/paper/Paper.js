import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

import "../../styles/PaperComponent.css";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "10px",
    flexGrow: 1,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function SimplePaper({ children, classProps }) {
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.paper, "paper-component", classProps)}>
      {children}
    </Paper>
  );
}
