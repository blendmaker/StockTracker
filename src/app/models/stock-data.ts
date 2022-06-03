export interface StockData {
  /**
   * Current price
   */
  c: number;

  /**
   * Change
   */
  d: number;

  /**
   * Percent change
   */
  dp: number;

  /**
   * High price of the day
   */
  h: number;

  /**
   * Low price of the day
   */
  l: number;

  /**
   * Open price of the day
   */
  o: number;

  /**
   * Previous close price
   */
  pc: number;

  /**
   * The company name
   */
  name: string;
}

// export function isStockData(data: any): data is StockData {
//   if (typeof data !== 'object') {
//     return false;
//   }
//
//   const members = [ 'c', 'd', 'dp', 'h', 'l', 'o', 'pc' ];
//   const keys = Object.keys(data);
//   for (const member of members) {
//     if (keys.indexOf(member) === -1 || typeof data[member] !== 'number') {
//       return false;
//     }
//   }
//   return true;
// }
//
