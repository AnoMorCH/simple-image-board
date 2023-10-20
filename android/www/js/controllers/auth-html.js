import { Auth } from "../classes/auth.js";
import { AuthHtml } from "../classes/html/auth.js";
import { User } from "../classes/user.js";

const isAuthorized = Auth.isAuthorized();
const nicknameToken = User.getNicknameToken();
const promisedNickname = User.getNickname(isAuthorized, nicknameToken);
promisedNickname.then((nickname) => {
  new AuthHtml().setNavHtml(isAuthorized, nickname);
});
