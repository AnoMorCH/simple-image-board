import { BACK_END_URLS } from "../consts/back-end-urls";
import "../import/jquery.js"; // import jQuery

/**
 * Handle a logic related with a topic.
 */
export class Topic {
  /**
   * Get a promise of a topic object.
   * @param {*} id An id of a wanted topic.
   * @returns A promise of a topic object.
   */
  static async getPromise(id) {
    const data = {
      id: id,
    };
    return $.get(BACK_END_URLS["get-topic-servlet"], data);
  }

  /**
   * Get an id of a topic from the current browser url.
   * @returns An id of a topic from the current browser url.
   */
  static getIdFromGetRequest() {
    const url = location.search;
    const urlSearchParams = new URLSearchParams(url);
    return parseInt(urlSearchParams.get("id"));
  }

  /**
   * Get all topics from a database.
   * @returns All topics from a database.
   */
  static async getAll() {
    return $.get(BACK_END_URLS["get-all-topics-servlet"]);
  }
}
