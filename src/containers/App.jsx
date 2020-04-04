import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../components/Header";
import AuthContainer from "./AuthContainer";
import ListPage from "../components/ListPage";
import UsersList from "../components/UsersList";
import ContestBreadcrumbs from "../components/Header/ContestBreadcrumbs";
import ContestForm from "../components/ContestForm";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function App(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Router>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.root}>
                <CssBaseline />
                <Header {...props} />

                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <ContestBreadcrumbs />
                  <Route
                    exact
                    path="/"
                    component={() => <AuthContainer type="login" />}
                  />
                  <Route path="/home" component={ListPage} />

                  <Route path="/users" component={UsersList} />
                  <Route path="/create" component={ContestForm} />
                  <Route
                    path="/login"
                    component={() => <AuthContainer type="login" />}
                  />
                  <Route
                    path="/signup"
                    component={() => <AuthContainer type="signup" />}
                  />
                </main>
              </div>
            </Grid>
          </Grid>
        </Router>
      </Container>
    </React.Fragment>
  );
}
export default App;
