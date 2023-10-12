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
    const data = { "topic-id": topicId };
    return $.get(BACK_END_URLS["get-posts-of-topic-servlet"], data);
  }

  /**
   * Send a request to create a post.
   * @param {*} nicknameToken An authorized user's nickname token.
   * @param {*} topicId An ID of a topic where a post should be created.
   * @param {*} message A post message.
   * @param {*} datetime A date and time of post creation.
   */
  static async create(nicknameToken, topicId, message, datetime) {
    const data = {
      "nickname-token": nicknameToken,
      "topic-id": topicId,
      message: message,
      datetime: datetime,
    };
    $.get(BACK_END_URLS["create-post-servlet"], data);
  }

  /**
   * Delete a post.
   * @param {*} id The post ID.
   * @param {*} nicknameToken A authorized user nickname token.
   */
  static async delete(id, nicknameToken) {
    const data = {
      "post-id": id,
      "nickname-token": nicknameToken,
    };
    $.get(BACK_END_URLS["remove-post-servlet"], data);
  }
}
