import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  error: {
    color: "var(--error-color)",
  },
};
const useStyles = makeStyles(styles);

export default function Errors(props) {
  const classes = useStyles();
  const { errors } = props;
  return (
    <div>
      {errors.length > 0 && (
        <>
          {errors.map((error) => (
            <div className={classes.error} key={error}>
              {error}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
