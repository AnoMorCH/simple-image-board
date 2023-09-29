export class Msg {
  MSG_TAG_ID = "msg";
  SUCCESS_MSG_COLOR = "green";
  ERROR_MSG_COLOR = "red";

  element = document.getElementById(this.MSG_TAG_ID);

  success;
  innerHTML;

  /**
   * Define some support vars.
   * @param {*} success A status of a message (either success or error).
   * @param {*} innerHTML A innerHTML to be set as the innerHTML of the element.
   */
  constructor(success, innerHTML = "") {
    this.success = success;
    this.innerHTML = innerHTML;
  }

  /**
   * Show a message to a client.
   * @param {*} isDataValid If data is invalid, then show a special message.
   */
  show(isDataValid = true) {
    if (!isDataValid) {
      this.#setInnerHTMLWithInvalidDataMessage();
    }
    this.#setNewColor();
    this.#setInnerText();
  }

  /**
   * Set a new id for the element (to change its color).
   */
  #setNewColor() {
    if (this.success) {
      this.element.style.color = this.SUCCESS_MSG_COLOR;
    } else {
      this.element.style.color = this.ERROR_MSG_COLOR;
    }
  }

  /**
   * Set a new innerHTML for the element.
   */
  #setInnerText() {
    this.element.innerHTML = this.innerHTML;
  }

  /**
   * Set inner HTML with invalid data message.
   */
  #setInnerHTMLWithInvalidDataMessage() {
    this.innerHTML =
      "<div>We're sorry, but your data is invalid.</div>" +
      "<div>A nickname should have at least 1 character and a password" +
      " should have at least 8 characters.</div>";
  }
}
