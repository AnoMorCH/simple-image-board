import { BACK_END_URLS } from "../consts/back-end-urls.js";

/**
 * Handles the general auth logic.
 */
export class Auth {
  static #NICKNAME_TOKEN_COOKIE_NAME = "token";

  /**
   * Sign up a new user.
   * @param {*} nickname A nickname inputted by a client.
   * @param {*} password A password inputted by a client.
   * @returns A promise of a response.
   */
  static async signUp(nickname, password) {
    const data = {
      nickname: nickname,
      password: password,
    };
    return $.post(BACK_END_URLS["sign-up-servlet"], data);
  }

  /**
   * Send a login request to the server and receive a JSON response..
   * @param {*} nickname A nickname inputted by a client.
   * @param {*} password A password inputted by a client.
   * @returns A promise of response.
   */
  static async logInBackend(nickname, password) {
    const data = {
      nickname: nickname,
      password: password,
    };
    return $.post(BACK_END_URLS["log-in-servlet"], data);
  }

  /**
   * Log in a user inside of front-end storing a token in local storage.
   * @param {*} token A token which is used to make a user logged in.
   */
  static async logInFrontend(token) {
    const storage = window.localStorage;
    storage.setItem(this.#NICKNAME_TOKEN_COOKIE_NAME, token);
  }

  /**
   * Check if a user is authorized based on presence of a token.
   * @returns If a user is authorized.
   */
  static isAuthorized() {
    const storage = window.localStorage;
    return storage.getItem(this.#NICKNAME_TOKEN_COOKIE_NAME) !== null;
  }

  /**
   * Log out a user deleting their token.
   */
  static logOut() {
    const storage = window.localStorage;
    storage.removeItem(this.#NICKNAME_TOKEN_COOKIE_NAME);
  }
}
