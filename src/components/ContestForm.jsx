import React from "react";
import { withRouter } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Grid } from "@material-ui/core";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Loader from "./Loader";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
});

class ContestForm extends React.Component {
  state = {
    uniqueId: Math.random()
      .toString(36)
      .slice(-5)
  };

  render() {
    if (this.props.loggedInUserQuery.loading) {
      return <Loader loading={true} />;
    }

    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <Formik
          initialValues={{
            title: "",
            description: "",
            imageUrl: "",
            activationCode: "",
            uniqueId: this.state.uniqueId
          }}
          validate={values => {
            const errors = {};
            if (!values.title) {
              errors.title = "Title is required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("submitting ...");
            if (!this.props.loggedInUserQuery.loggedInUser) {
              console.warn("only logged in users can create new contests");
              return;
            }

            const { title, description, imageUrl, type, uniqueId } = values;
            const authorId = this.props.loggedInUserQuery.loggedInUser.id;

            // await this.props.createContestMutation({
            //   variables: { title, description, imageUrl, type, uniqueId, authorId }
            // });
            this.props.history.replace("/");
            setTimeout(() => {
              alert(title, description, imageUrl, type, uniqueId);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form
              onSubmit={handleSubmit}
              className={classes.form}
              noValidate
              autoComplete="off"
            >
              <Typography variant="h6" gutterBottom>
                Create New Contest
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    label="Title"
                    name="title"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    helperText={errors.title}
                    error={errors.title && touched.title}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    label="Description"
                    name="description"
                    multiline
                    rowsMax="4"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Image URL"
                    name="imageUrl"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.imageUrl}
                  />
                  {errors.imageUrl && touched.imageUrl && errors.imageUrl}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    label="Activation code"
                    fullWidth
                    name="activationCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.activationCode}
                  />
                  {errors.activationCode &&
                    touched.activationCode &&
                    errors.activationCode}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox color="secondary" name="agree" value="yes" />
                    }
                    label="I accept all the terms and conditions"
                  />
                </Grid>
                <Grid item xs={12}>
                  {this.state.imageUrl && (
                    <img
                      src={this.state.imageUrl}
                      alt=""
                      className="w-100 mv3"
                    />
                  )}
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const CREATE_CONTEST_MUTATION = gql`
  mutation CreateContestMutation(
    $title: String!
    $description: String!
    $imageUrl: String!
    $type: ContestType
    $uniqueId: String!
    $authorId: ID!
  ) {
    createContest(
      title: $title
      description: $description
      imageUrl: $imageUrl
      type: $type
      uniqueId: $uniqueId
      authorId: $authorId
    ) {
      id
    }
  }
`;

const UPDATE_CONTEST_MUTATION = gql`
  mutation UpdateContestMutation(
    $id: ID!
    $title: String!
    $description: String!
    $imageUrl: String!
    $type: ContestType
    $uniqueId: String!
    $authorId: ID!
  ) {
    updateContest(
      id: $id
      title: $title
      description: $description
      imageUrl: $imageUrl
      type: $type
      uniqueId: $uniqueId
      authorId: $authorId
    ) {
      id
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
  graphql(CREATE_CONTEST_MUTATION, { name: "createContestMutation" }),
  graphql(UPDATE_CONTEST_MUTATION, { name: "updateContestMutation" }),
  graphql(LOGGED_IN_USER_QUERY, {
    name: "loggedInUserQuery",
    options: { fetchPolicy: "network-only" }
  })
)(withStyles(styles)(withRouter(ContestForm)));
