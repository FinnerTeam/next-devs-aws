export const isEmailValid = (email) => {
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/;
  if (regex.test(email)) {
    return true;
  }
};

export const isPasswordValid = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  if (regex.test(password)) {
    return true;
  }
};
