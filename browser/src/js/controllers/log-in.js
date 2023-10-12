import { Auth } from "../classes/auth";
import { ClientInput } from "../classes/client-input";
import { Msg } from "../classes/msg";
import { FRONT_END_URLS } from "../consts/front-end-urls";
import { Html } from "../classes/html";

if (Auth.isAuthorized()) {
  Html.redirect(FRONT_END_URLS["index"]);
}

const logInForm = document.getElementById("log-in-form");

logInForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page from reloading on submit of the form

  let nickname = document.getElementById("nickname").value;
  let password = document.getElementById("password").value;

  nickname = ClientInput.getClean(nickname);
  password = ClientInput.getClean(password);

  const promisedAuthAnswer = Auth.logInBackend(nickname, password);
  promisedAuthAnswer.then((rawAuthAnswer) => {
    const authAnswer = JSON.parse(rawAuthAnswer);
    if (authAnswer["success"]) {
      Auth.logInFrontend(authAnswer["comment"]);
      Html.redirect(FRONT_END_URLS["index"]);
    } else {
      new Msg(authAnswer["success"], authAnswer["comment"]).show();
    }
  });
});
