import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function Loader({ loading }) {
  const classes = useStyles();
  return loading ? (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  ) : (
    ""
  );
}
