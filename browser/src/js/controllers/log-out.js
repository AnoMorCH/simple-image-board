import { Auth } from "../classes/auth";
import { FRONT_END_URLS } from "../consts/front-end-urls";
import { Html } from "../classes/html";

if (!Auth.isAuthorized()) {
  Html.redirect(FRONT_END_URLS["index"]);
}

Auth.logOut();
Html.redirect(FRONT_END_URLS["index"]);
