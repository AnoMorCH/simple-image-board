import { Auth } from "../classes/auth.js";
import { ClientInput } from "../classes/client-input.js";
import { Msg } from "../classes/msg.js";
import { Validator } from "../classes/validator.js";
import { FRONT_END_URLS } from "../consts/front-end-urls.js";
import { Html } from "../classes/html.js";

if (Auth.isAuthorized()) {
  Html.redirect(FRONT_END_URLS["index"]);
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
