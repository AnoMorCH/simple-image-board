import { BACK_END_URLS } from "../consts/back-end-urls";
import "../import/jquery.js"; // import jQuery

// TODO. Write what the class below does.
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
}
