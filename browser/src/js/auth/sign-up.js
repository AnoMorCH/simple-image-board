import { Auth } from "../classes/auth";
import { Msg } from "../classes/msg";
import { Validator } from "../classes/validator";

const signUpForm = document.getElementById("sign-up-form");

signUpForm.addEventListener("submit", e => {
  e.preventDefault(); // prevent page reloading on submit of the form

  const nickname = document.getElementById("nickname").value;
  const password = document.getElementById("password").value;

  if (Validator.isDataOk(nickname, password)) {
    const promisedResponse = Auth.signUp(nickname, password);
    promisedResponse.then(rawResponse => {
      const response = JSON.parse(rawResponse);
      new Msg(response["success"], response["comment"]).show();
    });
  } else {
    new Msg(false).show(false);
  }
});
