/**
 * Change HTML code of pages related to posts.
 */
export class PostHtml {
  /**
   * Add posts to the list where they should be put.
   * @param {*} posts The posts which should be put.
   */
  static setList(posts) {
    const element = document.getElementById("posts");
    for (const post of posts) {
      const postElement = this.#getPostElement(
        this.#getNickname(post["nickname"]),
        post["id"],
        post["datetime"],
        post["message"]
      );
      element.appendChild(postElement);
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
   * @param {*} nickname A nickname for an author's post.
   * @param {*} id An ID of a post.
   * @param {*} datetime Date and time of posting.
   * @returns A post info element.
   */
  static #getPostInfoElement(nickname, id, datetime) {
    const element = document.createElement("div");

    const nicknameElement = document.createElement("strong");
    const idElement = document.createElement("span");
    const datetimeElement = document.createElement("span");

    nicknameElement.innerHTML = `${nickname} `;
    idElement.innerHTML = `#${id} `;
    datetimeElement.innerHTML = datetime;

    element.appendChild(nicknameElement);
    element.appendChild(idElement);
    element.appendChild(datetimeElement);

    return element;
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
   * @param {*} nickname A nickname for an author's post.
   * @param {*} id An ID of a post.
   * @param {*} datetime Date and time of posting.
   * @param {*} text The text of a post.
   * @returns A post element.
   */
  static #getPostElement(nickname, id, datetime, text) {
    const info = this.#getPostInfoElement(nickname, id, datetime);
    const message = this.#getPostMessageElement(text);

    const container = document.createElement("div");
    container.classList.add("post");
    container.appendChild(info);
    container.appendChild(message);

    return container;
  }
}
