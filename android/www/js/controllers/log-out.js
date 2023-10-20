import { Auth } from "../classes/auth.js";
import { FRONT_END_URLS } from "../consts/front-end-urls.js";
import { Html } from "../classes/html.js";

if (!Auth.isAuthorized()) {
  Html.redirect(FRONT_END_URLS["index"]);
}

Auth.logOut();
Html.redirect(FRONT_END_URLS["index"]);
