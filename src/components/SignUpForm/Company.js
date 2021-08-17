import React, { useRef, useState, useEffect } from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { isEmailValid, isPasswordValid } from "../../validations/auth";

export default function CompanyInputs(props) {
  const { dispatchForm, formState, setStep } = props;
  const emailRef = useRef();
  const passwordRef = useRef();
  const inputValidator = () => {
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    const nextStep = [false, false];
    if (isPasswordValid(password)) {
      dispatchForm({
        type: "password",
        value: password,
        isValid: true,
      });
      nextStep[0] = true;
    } else {
      dispatchForm({ type: "password", value: password, isValid: false });
    }
    if (isEmailValid(email)) {
      dispatchForm({
        type: "email",
        value: email,
        isValid: true,
      });
      nextStep[1] = true;
    } else {
      dispatchForm({ type: "email", value: email, isValid: false });
    }
    if (nextStep[0] && nextStep[1]) {
      setStep(2);
    }
  };
  return (
    <>
      <GridItem>
        <CustomInput
          //   error={emailIsValid === false}
          //   success={emailIsValid === true}
          //   ref={emailRef}
          labelText="Company name"
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
          //   error={passwordIsValid === false}
          //   success={passwordIsValid === true}
          //   ref={passwordRef}
          labelText="City"
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
      <GridItem>
        <CustomInput
          //   error={passwordIsValid === false}
          //   success={passwordIsValid === true}
          //   ref={passwordRef}
          labelText="Country"
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
      <GridItem>
        <CustomInput
          //   error={passwordIsValid === false}
          //   success={passwordIsValid === true}
          //   ref={passwordRef}
          labelText="Postal Code"
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
    </>
  );
}
