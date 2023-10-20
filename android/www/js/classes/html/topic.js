import { FRONT_END_URLS } from "../../consts/front-end-urls.js";

/**
 * Change HTML code of pages related to a topic.
 */
export class TopicHtml {
  /**
   * Set a headline and a description for the topic.html page.
   * @param {*} headline A headline of a topic.
   * @param {*} description A description of a topic.
   */
  static setData(headline, description) {
    this.#setHeadline(headline);
    this.#setDescription(description);
  }

  /**
   * Set a list of topics for the index.html page.
   * @param {*} topics Topics whose data should be used for the list of topics.
   */
  static setList(topics) {
    const element = document.getElementById("topics");
    for (const topic of topics) {
      const href = this.#getHref(topic["id"]);
      const li = this.#getLiLink(href, topic["name"]);
      element.appendChild(li);
    }
  }

  /**
   * Get a <li> element containing a <a> element with some data.
   * @param {*} href A href for the <a> element.
   * @param {*} innerHTML A innerHTML for the <a> element.
   * @returns A <li> element containing a <a> element with some data.
   */
  static #getLiLink(href, innerHTML) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.innerHTML = innerHTML;
    li.appendChild(a);
    return li;
  }

  /**
   * Get a href to redirect to a topic page.
   * @param {*} id An id of a topic.
   * @returns A href to redirect to a page with a topic page.
   */
  static #getHref(id) {
    return FRONT_END_URLS["topic"] + "?id=" + id;
  }

  /**
   * Set a headline for the topic.html page.
   * @param {*} innerHTML The headline.
   */
  static #setHeadline(innerHTML) {
    const element = document.getElementById("headline");
    element.innerHTML = innerHTML;
  }

  /**
   * Set a description for the topic.html page.
   * @param {*} innerHTML The description.
   */
  static #setDescription(innerHTML) {
    const element = document.getElementById("description");
    element.innerHTML = innerHTML;
  }
}
