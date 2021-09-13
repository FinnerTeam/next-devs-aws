import React, { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/Auth/helpers";
import { getUserProfile } from "../../store/user";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
const styles = {
  wrapper: {
    marginTop: "15vh",
  },
  cardFooter: {
    justifyContent: "center",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  error: {
    color: "var(--error-color)",
  },
  link: {
    marginLeft: "5px",
  },
};

const useStyles = makeStyles(styles);

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const emailRef = useRef();
  const passwordRef = useRef();
  const loginHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    dispatch(login(enteredEmail, enteredPassword));
  };

  useEffect(() => {
    if (auth.isLoggedIn === true) {
      dispatch(getUserProfile(auth.accessToken));
      history.replace("/admin");
    }
  }, [auth.isLoggedIn, dispatch, auth.accessToken, history]);

  return (
    <div className={classes.wrapper}>
      <GridContainer justify="center" align="center">
        <GridItem xs={10} sm={8} md={6} lg={4}>
          <Card style={{ border: "1px solid var(--border-card)" }}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Login to Next-Devs</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={loginHandler}>
                {" "}
                <GridItem>
                  <CustomInput
                    ref={emailRef}
                    labelText="Email address"
                    id="email"
                    type={"email"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                </GridItem>{" "}
                <GridItem>
                  <CustomInput
                    ref={passwordRef}
                    labelText="Password"
                    id="password"
                    type={"password"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                    }}
                  />
                </GridItem>{" "}
                {!!auth.error && (
                  <div className={classes.error}>{auth.error}</div>
                )}
                <Button type="submit" color="primary">
                  {auth.isLoading ? "Loading.." : "Login"}
                </Button>
              </form>
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              New to Next-Devs?
              <Link to="/signUp" className={classes.link}>
                Create an account.
              </Link>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
