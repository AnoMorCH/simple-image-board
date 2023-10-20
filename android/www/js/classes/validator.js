/**
 * Please, note that the validation is quite simple. It only checks that
 * 1. A nickname has at least 1 character.
 * 2. A password has at least 8 characters.
 * 3. A password has only English letters and numbers.
 * Also, it trims all space characters both on the front-end and back-end.
 */

/**
 * Validates data provided by a client.
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
   * Provide a message explaining why the data is invalid.
   * @returns A message explaining why the data is invalid.
   */
  static getInnerHTMLForInvalidDataMsg() {
    const innerHTML =
      "<div>We're sorry, but your data is invalid.</div>" +
      "<div>" +
      "<ol>" +
      "<li>A nickname should have at least 1 character.</li>" +
      "<li>A password should have at least 8 characters.</li>" +
      "<li>A password should have only English letters and numbers.</li>" +
      "<li>All space characters will be trimmed.</li>"
      "</ol>" +
      "</div>";
    return innerHTML;
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
    return (
      value.length >= this.#MIN_PASSWORD_LENGTH &&
      this.#hasOnlyEngLettersAndNumbers(value)
    );
  }

  /**
   * Check if a string value has only English letters and numbers.
   * @param {*} value A string for checking.
   * @returns If a string value has only English letters and numbers.
   */
  static #hasOnlyEngLettersAndNumbers(value) {
    const regex = new RegExp("^[a-zA-Z0-9]*$");
    return regex.test(value);
  }
}
