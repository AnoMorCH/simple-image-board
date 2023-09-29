import { BACK_END_URLS } from "../consts/back-end-urls";
import { BACK_END_URLS } from "../consts/back-end-urls";
import "../import/jquery.js"; // import jQuery

/**
 * Note that the validation is quite simple: it only checks on front-end and
 * back-end if a password is not less than 8 arbitrary characters and a
 * nickname is not less than 1 arbitrary character. The reason is simple:
 * this is a study project and there is no need in complex validation.
 */

export class Auth {
  /**
   * Sign up a new user.
   * @param {*} nickname A nickname inputted by a client.
   * @param {*} password A password inputted by a client.
   * @returns A promise of a response.
   */
  static async signUp(nickname, password) {
    const data = {
      "nickname": nickname,
      "password": password
    };
    return $.post(BACK_END_URLS["sign-up-servlet"], data);
  }

  /**
   * Check if data sent by a user is valid.
   * @param {*} nickname A nickname inputted by a client.
   * @param {*} password A password inputted by a client.
   * @returns If data is valid.
   */
  static isDataValid(nickname, password) {
    return this.#isNicknameValid(nickname) && this.#isPasswordValid(password);
  }

  /**
   * Check if a given nickname is valid.
   * @param {*} value A nickname value.
   * @returns If a nickname is valid.
   */
  static #isNicknameValid(value) {
    const MINIMAL_LENGTH = 1;
    return value.length >= MINIMAL_LENGTH;
  }

  /**
   * Check if a given password is valid.
   * @param {*} value A password value.
   * @returns If a password is valid.
   */
  static #isPasswordValid(value) {
    const MINIMAL_LENGTH = 8;
    return value.length >= MINIMAL_LENGTH;
  }
}
