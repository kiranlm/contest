import React, { createContext, Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

const AuthContext = createContext({
  user: null,
  isAuthenticated: null
});

export default AuthContext.Consumer;

class AuthController extends Component {
  state = {
    user: null,
    isAuthenticated: null
  };

  componentDidUpdate() {
    this.checkAuthentication();
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    return (
      this.props.loggedInUserQuery.loggedInUser &&
      this.props.loggedInUserQuery.loggedInUser.id
    );
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`;

export default compose(
  graphql(LOGGED_IN_USER_QUERY, {
    name: "loggedInUserQuery",
    options: { fetchPolicy: "network-only" }
  })
)(AuthProvider);
