import { Auth } from "../classes/auth";
import { AuthHtml } from "../classes/html/auth";
import { User } from "../classes/user";

const isAuthorized = Auth.isAuthorized();
const promisedNickname = User.getNickname(isAuthorized);
promisedNickname.then((nickname) => {
  new AuthHtml().setNavHtml(isAuthorized, nickname);
});
