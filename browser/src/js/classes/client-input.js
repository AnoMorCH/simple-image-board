// TODO. Write what the class below does.
export class ClientInput {
  /**
   * Provide clean data from the dirty one.
   * @param {*} dirtyValue Data which should be cleaned.
   * @returns Clean data.
   */
  static getClean(dirtyValue) {
    return dirtyValue.trim();
  }
}
