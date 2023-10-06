import { BACK_END_URLS } from "../consts/back-end-urls";
import { FRONT_END_URLS } from "../consts/front-end-urls";

/**
 * Handle a logic related with a topic.
 */
export class Topic {
  /**
   * Get all topics from a database.
   * @returns All topics from a database.
   */
  static async getAll() {
    return $.get(BACK_END_URLS["get-all-topics-servlet"]);
  }

  /**
   * Set all fetched topic to a HTML file.
   * @param {*} htmlElement The HTML element where topics should be placed.
   * @param {*} topics The topics which should be placed.
   */
  static setAllTo(htmlElement, topics) {
    for (const topic of topics) {
      const href = this.#createHref(topic["id"]);
      const innerHTML = topic["name"];
      const li = this.#createLiLink(href, innerHTML);
      htmlElement.appendChild(li);
    }
  }

  /**
   * Create a <li> element where a redirect to a topic is stored.
   * @param {*} href A link which leads to the topic.
   * @param {*} innerHTML A inner HTML which should be placed inside of the link.
   * @returns A <li> element where a redirect to a topic is stored.
   */
  static #createLiLink(href, innerHTML) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.innerHTML = innerHTML;
    li.appendChild(a);
    return li;
  }

  /**
   * Create a link which leads to a specific topic.
   * @param {*} topicId A id of the topic.
   * @returns A link which leads to a specific topic.
   */
  static #createHref(topicId) {
    return FRONT_END_URLS["topic"] + "?id=" + topicId;
  }
}
