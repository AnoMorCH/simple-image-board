import { BACK_END_URLS } from "../consts/back-end-urls";
import Cookies from "js-cookie";
import "../import/jquery.js"; // import jQuery

/**
 * Handle logic connected with a user.
 */
export class User {
  /**
   * Retrieve a current user's nickname based on the token stored in cookies.
   * @returns A current user's nickname.
   */
  async getCurrentNickname() {
    const data = {
      token: Cookies.get("token"),
    };
    return $.get(BACK_END_URLS["get-user-servlet"], data);
  }
}
