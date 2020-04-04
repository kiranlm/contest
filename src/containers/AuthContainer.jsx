import React from "react";
import { withRouter } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { Grid } from "@material-ui/core";

class AuthContainer extends React.Component {
  authenticateUser = async ({ email, password }) => {
    const response = await this.props.authenticateUserMutation({
      variables: { email, password }
    });
    localStorage.setItem("_token", response.data.authenticateUser.token);
    this.props.history.replace("/home");
  };

  signupUser = async props => {
    const { email, password, name, role } = props;
    try {
      const user = await this.props.signupUserMutation({
        variables: { email, password, name, role }
      });
      localStorage.setItem("_token", user.data.signupUser.token);
      this.props.history.replace("/home");
    } catch (e) {
      console.error(`An error occured: `, e);
      this.props.history.replace("/");
    }
  };

  render() {
    if (
      this.props.loggedInUserQuery.loggedInUser &&
      this.props.loggedInUserQuery.loggedInUser.id
    ) {
      console.warn("already logged in");
      this.props.history.replace("/home");
    }

    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item md={6}>
          {this.props.type === "signup" ? (
            <Signup authenticate={props => this.signupUser({ ...props })} />
          ) : (
            <Login
              authenticate={props => this.authenticateUser({ ...props })}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`;

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation(
    $email: String!
    $password: String!
    $name: String
    $role: String
  ) {
    signupUser(email: $email, password: $password, name: $name, role: $role) {
      id
      token
    }
  }
`;

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`;
export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, { name: "authenticateUserMutation" }),
  graphql(SIGNUP_USER_MUTATION, { name: "signupUserMutation" }),
  graphql(LOGGED_IN_USER_QUERY, {
    name: "loggedInUserQuery",
    options: { fetchPolicy: "network-only" }
  })
)(withRouter(AuthContainer));
