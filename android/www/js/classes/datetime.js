/**
 * Handles date and time logic.
 */
export class Datetime {
  #date;

  constructor() {
    this.#date = new Date();
  }

  /**
   * Get current date and time.
   * @returns Current date and time.
   */
  get() {
    const date = this.#getDate();
    const time = this.#getTime();
    return `${date} ${time}`;
  }
  
  /**
   * Get current date.
   * @returns Current date.
   */
  #getDate() {
    const dd = String(this.#date.getDate()).padStart(2, '0');
    const mm = String(this.#date.getMonth() + 1).padStart(2, '0');
    const yyyy = this.#date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
  
  /**
   * Get current time.
   * @returns Current time.
   */
  #getTime() {
    const hh = String(this.#date.getHours()).padStart(2, '0');
    const mm = String(this.#date.getMinutes()).padStart(2, '0');
    const ss = String(this.#date.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
}
