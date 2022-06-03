export interface SentimentData {
  /**
   * Symbol of the company.
   */
  symbol: string;

  /**
   * The Companyname
   */
  name: string;

  /**
   * Array of sentiment data.
   */
  data: {
    /**
     * Net buying/selling from all insiders' transactions.
     */
    change: number,

    /**
     * Month.
     */
    month: number,

    /**
     * Monthly share purchase ratio.
     */
    mspr: number,

    /**
     * Symbol.
     */
    symbol: string,

    /**
     * Year.
     */
    year: number
  }[];
}
