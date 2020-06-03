import React, { useState, useEffect } from "react";
import { VerticalMenu } from "../../components";
import {MultipleOpenReports} from "./index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { userManager } from "../../modules";

const Reports = ({ match }) => {
  const [reportsView, setReportsView] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (match.params.report_type) {
      setReportsView(match.params.report_type);
    } else if (reportsView) {
      setReportsView("");
    }
  }, [match]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2} md={2}>
          {/* 
              Edit Profile doesn't appear in the menu, 
              because it is accessed from an edit button on /profile/view,
              not the menu itself
            */}
          <VerticalMenu
            menuData={[
              { title: "Multiple Orders", route: "/reports/multiple-orders" },
            ]}
            firstActive={reportsView}
          />
        </Grid>
        <Grid item xs={8} md={9}>
          {reportsView === "" && "Choose a report to run"}
          {reportsView === "multiple-orders" && <MultipleOpenReports/>}
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default Reports;
