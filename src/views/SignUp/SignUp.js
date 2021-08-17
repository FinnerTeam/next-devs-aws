import React, { useRef, useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "hooks/http";
import { useHistory } from "react-router-dom";
import { toastActions } from "store/toast";
import { useDispatch } from "react-redux";
//@material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Errors from "components/Messages/Errors";
// variables
import { inputFields } from "variables/signUp";
// import { config } from "url";

const styles = {
  wrapper: {
    marginTop: "15vh",
  },
  inputs: { maxHeight: "40vh", overflowY: "scroll" },
  cardFooter: {
    justifyContent: "center",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
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

  link: {
    marginLeft: "5px",
  },
};

const useStyles = makeStyles(styles);

const initialState = {
  email: { value: null, isValid: null },
  password: { value: null, isValid: null },
  userName: { value: null, isValid: null },
  firstName: { value: null, isValid: null },
  lastName: { value: null, isValid: null },
  company: { value: null, isValid: null },
  city: { value: null, isValid: null },
  country: { value: null, isValid: null },
  postalCode: { value: null, isValid: null },
  aboutMe: { value: null, isValid: null },
};

const formReducer = (state, action) => {
  return {
    ...state,
    [action.type]: {
      value: action.value || state[action.type].value,
      isValid: action.isValid,
    },
  };
};

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, errors: serverErrors, sendRequest } = useHttp();
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const [inputErrors, setInputErrors] = useState([]);
  const itemEls = useRef([]);
  const signUpHandler = (e) => {
    e.preventDefault();
    dispatch(
      toastActions.setToast({
        open: true,
        type: "primary",
        msg: "Sign Up Successfully",
      })
    );
    setInputErrors([]);
    inputFields.forEach((inputField) => {
      const validator = inputField.validate;
      if (
        (validator && validator(itemEls.current[inputField.key])) ||
        !validator
      ) {
        dispatchForm({
          type: inputField.key,
          value: itemEls.current[inputField.key],
          isValid: true,
        });
      } else {
        dispatchForm({
          type: inputField.key,
          value: itemEls.current[inputField.key],
          isValid: false,
        });
        setInputErrors((ps) => [...ps, inputField.error]);
      }
    });
  };

  useEffect(() => {
    const reducerValues = Object.values(formState);
    const isFormValid = reducerValues.every(function(input) {
      return input.isValid;
    });
    const inputFields = {};
    const reducerKeys = Object.keys(formState);
    reducerKeys.forEach((key) => {
      inputFields[key] = formState[key].value;
    });
    if (isFormValid) {
      (async function() {
        try {
          await sendRequest(
            "https://next-devs12.herokuapp.com/auth/signUp",
            "POST",
            JSON.stringify(inputFields),
            { "Content-Type": "application/json" }
          );
          dispatch(
            toastActions.setToast(true, "primary", "Sign Up Successfully")
          );
          history.replace("/login");
        } catch (err) {}
      })();
    }
  }, [formState, dispatch, history, sendRequest]);

  return (
    <div className={classes.wrapper}>
      <GridContainer justify="center" align="center">
        <GridItem xs={10} sm={8} md={6} lg={4}>
          <Card style={{ border: "1px solid var(--border-card)" }}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Sign up to Next-Devs</h4>
            </CardHeader>
            <CardBody>
              <form onSubmit={signUpHandler}>
                <div className={classes.inputs}>
                  {inputFields.map((input) => (
                    <GridItem key={input.key}>
                      <CustomInput
                        error={formState[input.key].isValid === false}
                        success={formState[input.key].isValid === true}
                        ref={(element) =>
                          (itemEls.current[input.key] = element?.value)
                        }
                        labelText={input.label}
                        type={input.type}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          multiline: input.key !== "aboutMe" ? false : true,
                        }}
                      />
                    </GridItem>
                  ))}
                </div>
                <Errors errors={inputErrors} />
                <Errors errors={serverErrors} />
                <Button color="primary" type="submit">
                  {isLoading ? "Loading.." : "Sign Up"}
                </Button>
              </form>
            </CardBody>
            <CardFooter className={classes.cardFooter}>
              Already have an account?
              <Link to="/login" className={classes.link}>
                Login.
              </Link>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
