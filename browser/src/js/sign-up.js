import { Auth } from "./classes/auth";
import { ClientInput } from "./classes/client-input";
import { Msg } from "./classes/msg";
import { Validator } from "./classes/validator";
import { redirect } from "./helper";
import { FRONT_END_URLS } from "./consts/front-end-urls";

if (Auth.isAuthorized()) {
  redirect(FRONT_END_URLS["index"]);
}

const signUpForm = document.getElementById("sign-up-form");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page from reloading on submit of the form

  let nickname = document.getElementById("nickname").value;
  let password = document.getElementById("password").value;

  nickname = ClientInput.getClean(nickname);
  password = ClientInput.getClean(password);

  if (Validator.isDataOk(nickname, password)) {
    const promisedResponse = Auth.signUp(nickname, password);
    promisedResponse.then((rawResponse) => {
      const response = JSON.parse(rawResponse);
      new Msg(response["success"], response["comment"]).show();
    });
  } else {
    new Msg(false, Validator.getInnerHTMLForInvalidDataMsg()).show();
  }
});
