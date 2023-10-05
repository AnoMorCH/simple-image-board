import { Auth } from "./classes/auth";
import { ClientInput } from "./classes/client-input";
import { Msg } from "./classes/msg";
import Cookies from "js-cookie";
import { redirect } from "./helper/index";
import { FRONT_END_URLS } from "./consts/front-end-urls";

if (Auth.isAuthorized()) {
  redirect(FRONT_END_URLS["index"]);
}

const logInForm = document.getElementById("log-in-form");

logInForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page from reloading on submit of the form

  let nickname = document.getElementById("nickname").value;
  let password = document.getElementById("password").value;

  nickname = ClientInput.getClean(nickname);
  password = ClientInput.getClean(password);

  const promisedResponse = Auth.logIn(nickname, password);
  promisedResponse.then((rawResponse) => {
    const response = JSON.parse(rawResponse);
    if (response["success"]) {
      Cookies.set("token", response["comment"]);
      redirect(FRONT_END_URLS["index"]);
    } else {
      new Msg(response["success"], response["comment"]).show();
    }
  });
});
