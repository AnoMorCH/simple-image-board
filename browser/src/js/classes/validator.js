/**
 * Please, note that the validation is quite simple: it only checks on 
 * front-end and back-end if a password is not less than 8 arbitrary 
 * characters and a nickname is not less than 1 arbitrary character. The 
 * reason is simple: this is a study project and there is no need in complex 
 * validation.
 */

export class Validator {
  static #MIN_NICKNAME_LENGTH = 1;
  static #MIN_PASSWORD_LENGTH = 8;

  /**
   * Check if data sent by a user is valid.
   * @param {*} nickname A nickname inputted by a client.
   * @param {*} password A password inputted by a client.
   * @returns If data is valid.
   */
  static isDataOk(nickname, password) {
    return this.#isNicknameOk(nickname) && this.#isPasswordOk(password);
  }

  /**
   * Check if a given nickname is valid.
   * @param {*} value A nickname value.
   * @returns If a nickname is valid.
   */
  static #isNicknameOk(value) {
    return value.length >= this.#MIN_NICKNAME_LENGTH;
  }

  /**
   * Check if a given password is valid.
   * @param {*} value A password value.
   * @returns If a password is valid.
   */
  static #isPasswordOk(value) {
    return value.length >= this.#MIN_PASSWORD_LENGTH;
  }
}
