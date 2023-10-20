import { Post } from "../post.js";
import { Html } from "../html.js";

/**
 * Change HTML code of pages related to posts.
 */
export class PostHtml {
  static #DELETE_ELEMENT_CLASS_NAME = "delete-element";
  static #DELETE_FORBIDDEN_NICKNAME = "anonymous";

  /**
   * Add posts to the list where they should be put.
   * @param {*} posts The posts which should be put.
   */
  static setList(posts, userNickname) {
    const element = document.getElementById("posts");
    for (const post of posts) {
      const postElement = this.#getPostElement(
        userNickname,
        this.#getNickname(post["nickname"]),
        post["id"],
        post["datetime"],
        post["message"]
      );
      element.appendChild(postElement);
    }
  }

  /**
   * Add an event which deletes a post if a button responsible for the post
   * deletion is clicked.
   * @param {*} nicknameToken An authorized user nickname token.
   */
  static async handleDeleteElements(nicknameToken) {
    const elements = document.getElementsByClassName(
      this.#DELETE_ELEMENT_CLASS_NAME
    );
    for (const element of elements) {
      element.addEventListener("click", async (e) => {
        e.preventDefault();
        await Post.delete(element.value, nicknameToken);
        Html.reload();
      });
    }
  }

  /**
   * Get a nickname for an author's post.
   * @param {*} nickname An author's nickname.
   * @returns A nickname for an author's post.
   */
  static #getNickname(nickname) {
    if (nickname === undefined) {
      return "anonymous";
    } else {
      return nickname;
    }
  }

  /**
   * Get a post info element.
   *
   * The element should look like this:
   * <div>
   *   <strong>NICKNAME</strong>
   *   <span>#ID</span>
   *   <span>DATETIME</span>
   * </div>
   *
   * @param {*} userNickname An authorized user nickname.
   * @param {*} nickname A nickname for an author's post.
   * @param {*} id An ID of a post.
   * @param {*} datetime Date and time of posting.
   * @returns A post info element.
   */
  static #getPostInfoElement(userNickname, nickname, id, datetime) {
    const element = document.createElement("div");
    this.#addPostElement(element, `${nickname} `, "strong");
    this.#addPostElement(element, `#${id} `, "span");
    this.#addPostElement(element, `${datetime} `, "span");
    this.#addDeleteElementForOwner(element, userNickname, nickname, id);
    return element;
  }

  /**
   * Add an element of a post.
   * @param {*} parentElement A place where the element should be put.
   * @param {*} innerHTML InnerHTML which should be put to the element.
   * @param {*} tag A tag of the element.
   */
  static #addPostElement(parentElement, innerHTML, tag) {
    const element = document.createElement(tag);
    element.innerHTML = innerHTML;
    parentElement.appendChild(element);
  }

  /**
   * Add a delete element if a user is a post owner.
   * @param {*} parentElement A place where the element should be put.
   * @param {*} userNickname An authorized user nickname.
   * @param {*} nickname The post owner's nickname.
   * @param {*} id An ID of the post.
   */
  static #addDeleteElementForOwner(parentElement, userNickname, nickname, id) {
    if (
      userNickname != this.#DELETE_FORBIDDEN_NICKNAME &&
      userNickname == nickname
    ) {
      const deleteElement = document.createElement("a");
      deleteElement.innerHTML = "delete";
      deleteElement.href = "";
      deleteElement.value = id;
      deleteElement.className = this.#DELETE_ELEMENT_CLASS_NAME;
      parentElement.appendChild(deleteElement);
    }
  }

  /**
   * Get a post message element.
   *
   * The element should look like this:
   * <div>
   *   <span>></span>
   *   <span>TEXT</span>
   * </div>
   *
   * @param {*} text The text of a post.
   * @returns A post message element.
   */
  static #getPostMessageElement(text) {
    const element = document.createElement("div");

    const moreThanElement = document.createElement("span");
    const textElement = document.createElement("span");

    moreThanElement.innerHTML = ">";
    textElement.innerHTML = " " + text;

    element.appendChild(moreThanElement);
    element.appendChild(textElement);

    return element;
  }

  /**
   * Get a post element.
   *
   * The element should look like this:
   * <div class="post">
   *   <div>
   *     <strong>NICKNAME</strong>
   *     <span>ID</span>
   *     <span>DATETIME</span>
   *   </div>
   *
   *   <div>
   *     <span>></span>
   *     <span>TEXT</span>
   *   </div>
   * </div>
   * @param {*} userNickname An authorized user nickname.
   * @param {*} nickname A nickname for an author's post.
   * @param {*} id An ID of a post.
   * @param {*} datetime Date and time of posting.
   * @param {*} text The text of a post.
   * @returns A post element.
   */
  static #getPostElement(userNickname, nickname, id, datetime, text) {
    const info = this.#getPostInfoElement(userNickname, nickname, id, datetime);
    const message = this.#getPostMessageElement(text);

    const container = document.createElement("div");
    container.classList.add("post");
    container.appendChild(info);
    container.appendChild(message);

    return container;
  }
}
