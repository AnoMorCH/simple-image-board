// TODO. Write what the class below does.
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
  constructor(success, innerHTML) {
    this.success = success;
    this.innerHTML = innerHTML;
  }

  /**
   * Show a message to a client.
   */
  show() {
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
}
