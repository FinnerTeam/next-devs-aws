export const isStringValid = (string) => {
  const regex = /^[A-Za-z]+$/;
  if (regex.test(string)) {
    return true;
  }
};
export const isPostalCodeValid = (postalCode) => {
  const number = parseInt(postalCode);
  const regex = /^\d+$/;
  if (regex.test(number)) {
    return true;
  }
};
