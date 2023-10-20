import { BACK_END_URLS } from "../consts/back-end-urls.js";

/**
 * Handle logic connected with a user.
 */
export class User {
  static #NICKNAME_TOKEN_COOKIE_NAME = "token";

  /**
   * Get a user's nickname promise.
   * @param {*} isAuthorized If a user is authorized.
   * @param {*} nicknameToken A token storing a user's nickname.
   * @returns A user's nickname promise.
   */
  static async getNickname(isAuthorized, nicknameToken) {
    if (!isAuthorized) {
      return this.#getAnonymousNickname();
    }
    const rawNickname = await this.#getNicknamePromise(nicknameToken);
    const nicknameAnswer = JSON.parse(rawNickname);
    return nicknameAnswer["comment"];
  }

  /**
   * Get a token storing information about an authorized user nickname.
   * @returns A token storing information about an authorized user nickname.
   */
  static getNicknameToken() {
    const storage = window.localStorage;
    return storage.getItem(this.#NICKNAME_TOKEN_COOKIE_NAME);
  }

  /**
   * Get a user's nickname promise.
   * @returns A user's nickname promise.
   */
  static async #getNicknamePromise(nicknameToken) {
    const data = { token: nicknameToken };
    return $.get(BACK_END_URLS["get-user-servlet"], data);
  }

  /**
   * Get an anonymous user's nickname.
   * @returns An anonymous user's nickname.
   */
  static #getAnonymousNickname() {
    return "anonymous";
  }
}
