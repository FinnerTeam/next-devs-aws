import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { toastActions } from "../../store/toast";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Toast() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarOpen = useSelector((state) => state.toast.snackbarOpen);
  console.log(snackbarOpen);
  const snackbarType = useSelector((state) => state.toast.snackbarType);
  const snackbarMessage = useSelector((state) => state.toast.snackbarMessage);

  const closeHandler = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    const payload = {
      open: false,
      type: snackbarType,
      msg: snackbarMessage,
    };
    dispatch(toastActions.setToast(payload));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeHandler}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={closeHandler}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
