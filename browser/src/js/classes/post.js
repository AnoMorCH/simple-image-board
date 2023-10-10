import { BACK_END_URLS } from "../consts/back-end-urls.js";
import "../import/jquery.js"; // import jQuery

/**
 * Handle a logic related to a post.
 */
export class Post {
  /**
   * Get a promise of posts on a topic.
   * @param {*} topicId The ID of a topic from which to retrieve posts.
   * @returns A promise of posts on a topic.
   */
  static async getPromise(topicId) {
    const data = {
      "topic-id": topicId,
    };
    return $.get(BACK_END_URLS["get-posts-of-topic-servlet"], data);
  }
}
