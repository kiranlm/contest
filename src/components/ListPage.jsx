import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Contest from "./Contest";
import ContestForm from "./ContestForm";
import Loader from "./Loader";

function ListPage(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (props.allContestsQuery.loading) {
    return <Loader loading={true} />;
  }
  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        + New Contest
      </Button>
      <Grid container direction="row" justify="center" alignItems="center">
        {props.allContestsQuery &&
          props.allContestsQuery.allContests &&
          props.allContestsQuery.allContests.map(contest => (
            <Grid item xs={12} md={4}>
              <Contest key={contest.id} contest={contest} />
            </Grid>
          ))}
      </Grid>
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <ContestForm />
          </DialogContent>
        </Dialog>
      </div>
    </React.Fragment>
  );
}

const ALL_CONTESTS_QUERY = gql`
  query AllContestsQuery {
    allContests(orderBy: createdAt_DESC) {
      id
      title
      imageUrl
      description
      uniqueId
    }
  }
`;

export default graphql(ALL_CONTESTS_QUERY, { name: "allContestsQuery" })(
  ListPage
);
