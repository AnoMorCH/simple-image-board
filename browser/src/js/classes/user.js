import { BACK_END_URLS } from "../consts/back-end-urls";
import Cookies from "js-cookie";
import "../import/jquery.js"; // import jQuery

/**
 * Handle logic connected with a user.
 */
export class User {
  /**
   * Get a user's nickname promise.
   * @param {*} isAuthorized If a user is authorized.
   * @returns A user's nickname promise.
   */
  static async getNickname(isAuthorized) {
    let nickname;
    if (isAuthorized) {
      const rawNickname = await this.#getNicknamePromise();
      const nicknameAnswer = JSON.parse(rawNickname);
      nickname = nicknameAnswer["comment"];
    } else {
      nickname = this.#getAnonymousNickname();
    }
    return nickname;
  }

  /**
   * Get a user's nickname promise.
   * @returns A user's nickname promise.
   */
  static async #getNicknamePromise() {
    const data = {
      token: Cookies.get("token"),
    };
    return $.get(BACK_END_URLS["get-user-servlet"], data);
  }

  /**
   * Get an anonymous user's nickname.
   * @returns 
   */
  static #getAnonymousNickname() {
    return "anonymous";
  }
}
