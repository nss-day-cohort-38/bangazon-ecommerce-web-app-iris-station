import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./expansion.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel({
  summary = "Summary for expansion",
  details = "Details for expansionDetails for expansionDetails for expansionDetails for expansionDetails for expansionDetails for expansionDetails for expansionDetails for expansionDetails for expansionDetails for expansion",
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="expansion-panel-summary">{summary}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className="expansion-panel-summary">{details}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
