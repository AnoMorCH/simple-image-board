import { FRONT_END_URLS } from "../../consts/front-end-urls";

/**
 * Change HTML pages based on the status of authentication.
 */
export class AuthHtml {
  #navList = document.getElementById("nav-list");
  #greeting = document.getElementById("greeting");

  /**
   * Set the navigation element of an HTML page.
   */
  setNavHtml(isAuthorized, nickname) {
    this.#addHomeBtn();
    this.#setUserNickname(nickname);
    if (isAuthorized) {
      this.#addLogOutBtn();
    } else {
      this.#addSignUpBtn();
      this.#addLogInBtn();
    }
  }

  /**
   * Set a user's nickname to HTML.
   * @param {*} value A user's nickname.
   */
  #setUserNickname(value) {
    this.#greeting.innerHTML = `hi, ${value}`;
  }

  /**
   * Add a home button to the navigation page of HTML.
   */
  #addHomeBtn() {
    this.#addBtn(this.#navList, "home ^_^", FRONT_END_URLS["index"], "home");
  }

  /**
   * Add a sign up button to the navigation page of HTML.
   */
  #addSignUpBtn() {
    this.#addBtn(
      this.#navList,
      "are you sure?",
      FRONT_END_URLS["sign-up"],
      "sign up"
    );
  }

  /**
   * Add a log in button to the navigation page of HTML.
   */
  #addLogInBtn() {
    this.#addBtn(this.#navList, "really?", FRONT_END_URLS["log-in"], "log in");
  }

  /**
   * Add a log out button to the navigation page of HTML.
   */
  #addLogOutBtn() {
    this.#addBtn(
      this.#navList,
      "bye T_T",
      FRONT_END_URLS["log-out"],
      "log out"
    );
  }

  /**
   * Add a button to a list element of HTML (eg <ul></ul>). An answer should
   * be like (watch the comment below)
   * <ul>
   *   <li><a href="" title="title">innerText</a></li>
   *   <li><a href="" title="title">innerText</a></li>
   * </ul>
   *
   * @param {*} list The list element of HTML.
   * @param {*} title A title of the link inside of <li> element.
   * @param {*} href A href of the link inside of <li> element.
   * @param {*} innerText A inner text of the link inside of <li> element.
   */
  #addBtn(list, title, href, innerText) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.title = title;
    a.href = href;
    a.innerText = innerText;
    li.appendChild(a);
    list.appendChild(li);
  }
}
