import { Auth } from "./classes/auth";
import { redirect } from "./helper";
import { FRONT_END_URLS } from "./consts/front-end-urls";

if (!Auth.isAuthorized()) {
  redirect(FRONT_END_URLS["index"]);
}

Auth.logOut();
redirect(FRONT_END_URLS["index"]);
