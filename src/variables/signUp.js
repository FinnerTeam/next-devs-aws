import { isPostalCodeValid } from "../validations/signUp";
import { isEmailValid, isPasswordValid } from "../validations/auth";
const validMsg = "Please enter a valid ";

export const inputFields = [
  {
    label: "Email address",
    type: "email",
    key: "email",
    validate: isEmailValid,
    error: validMsg + "email address",
  },
  {
    label: "Password",
    type: "password",
    key: "password",
    validate: isPasswordValid,
    error:
      validMsg +
      "password which contains numbers and letters, (8-25) letters and numbers",
  },
  {
    label: "User name",
    type: "text",
    key: "userName",
  },
  {
    label: "First name",
    type: "text",
    key: "firstName",
  },
  {
    label: "Last name",
    type: "text",
    key: "lastName",
  },
  {
    label: "Company",
    type: "text",
    key: "company",
    error: validMsg + "company name",
  },
  {
    label: "City",
    type: "text",
    key: "city",
    error: validMsg + "city",
  },
  {
    label: "Country",
    type: "text",
    key: "country",
    error: validMsg + "country",
  },
  {
    label: "Postal code",
    type: "number",
    key: "postalCode",
    validate: isPostalCodeValid,
    error: validMsg + "postal code (6-8) numbers",
  },
  {
    label: "About me",
    type: "text",
    key: "aboutMe",
    error: validMsg + "about me description 500 max characters",
  },
];
