import React, { useRef, useState, useEffect, useReducer } from "react";
import { useHttp } from "hooks/http";
import { toastActions } from "store/toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "store/user";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Errors from "components/Messages/Errors";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
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
  grid: {
    padding: 30,
  },
};

const useStyles = makeStyles(styles);

const initialState = {
  company: null,
  userName: null,
  email: null,
  firstName: null,
  lastName: null,
  city: null,
  country: null,
  postalCode: null,
  aboutMe: null,
  password: null,
};

const formReducer = (state, action) => {
  return {
    ...state,
    [action.type]: {
      value: action.value,
    },
  };
};

const inputLabels = [
  "Company",
  "User Name",
  "Email",
  "First Name",
  "Last Name",
  "City",
  "Country",
  "Postal Code",
  "About Me",
];
const inputSizes = [5, 3, 4, 6, 6, 4, 4, 4, 12];
const reducerKeys = Object.keys(initialState);
export default function UserProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const { isLoading, errors: serverErrors, sendRequest } = useHttp();
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const itemEls = useRef([]);

  const editProfileHandler = (e) => {
    e.preventDefault();
    reducerKeys.forEach((key) => {
      if (itemEls.current[key]) {
        dispatchForm({ type: key, value: itemEls.current[key] });
      }
    });
  };

  useEffect(() => {
    const inputFields = {};
    reducerKeys.forEach((key) => {
      if (formState[key]) {
        inputFields[key] = formState[key].value;
      }
    });
    if (Object.keys(inputFields).length > 0) {
      (async function() {
        try {
          const response = await sendRequest(
            "http://localhost:5000/user/profile",
            "PATCH",
            JSON.stringify(inputFields),
            {
              "Content-Type": "application/json",
              Auth: "Bearer  " + token,
            }
          );
          dispatch(userActions.userData(response));
          dispatch(
            toastActions.setToast(
              true,
              "primary",
              "Updated profile Successfully"
            )
          );
        } catch (err) {}
      })();
    }
  }, [formState, dispatch, sendRequest]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <form onSubmit={editProfileHandler}>
              <CardBody>
                <GridContainer>
                  {reducerKeys.map((key, index) => (
                    <GridItem key={key} xs={12} md={12} lg={inputSizes[index]}>
                      <InputLabel
                        style={{ fontWeight: "bold", marginTop: "30px" }}
                      >
                        {inputLabels[index]}
                      </InputLabel>
                      <CustomInput
                        ref={(element) =>
                          (itemEls.current[key] = element?.value)
                        }
                        labelText={user[key]}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: false,
                          multiline: key !== "aboutMe" ? false : true,
                          disabled: key !== "company" ? false : true,
                        }}
                      />
                    </GridItem>
                  ))}
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Errors errors={serverErrors} />
                <div>
                  {" "}
                  <Button color="primary" type="submit">
                    {isLoading ? "Loading.." : "Update Profile"}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
