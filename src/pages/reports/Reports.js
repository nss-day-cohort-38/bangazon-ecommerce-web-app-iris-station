import React, { useState, useEffect } from "react";
import { VerticalMenu } from "../../components";
import { MultipleOpenReports } from "./index";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
        <Grid item xs={12} md={3}>
          <VerticalMenu
            menuData={[
              { title: "Multiple Orders", route: "/reports/multiple-orders" },
            ]}
            firstActive={reportsView}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {reportsView === "" && "Choose a report to run"}
          {reportsView === "multiple-orders" && <MultipleOpenReports />}
        </Grid>
        <Grid item xs={false} md={1}></Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 0",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default Reports;
