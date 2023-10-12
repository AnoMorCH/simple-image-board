/**
 * Implement some logic related with HTML.
 */
export class Html {
  /**
   * Redirect to a url.
   * @param {*} url The url for redirection.
   */
  static redirect(url) {
    window.location = url;
  }

  /**
   * Reload an HTML page.
   */
  static reload() {
    location.reload();
  }
}