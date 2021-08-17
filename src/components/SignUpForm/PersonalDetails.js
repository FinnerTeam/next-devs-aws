import React, { useRef, useState, useEffect } from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

export default function PersonalInputs() {
  return (
    <>
      <GridItem>
        <CustomInput
          //   error={emailIsValid === false}
          //   success={emailIsValid === true}
          //   ref={emailRef}
          labelText="User name"
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
          labelText="First name"
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
          labelText="Last name"
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
          labelText="About me"
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
