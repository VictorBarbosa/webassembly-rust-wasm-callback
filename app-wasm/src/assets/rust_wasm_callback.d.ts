/* tslint:disable */
/* eslint-disable */
/**
*/
export class ExClass {
  free(): void;
/**
*/
  constructor();
/**
*
* The callback has an JSON string than must be parse to RetEx
* @param {number} counter
* @returns {RetEx}
*/
  conterPrimer(counter: number): RetEx;
/**
*
* The callback has an JSON string than must be parse to RetEx
* @param {number} counter
* @param {Function} callback
* @returns {Promise<void>}
*/
  ex_function_callback(counter: number, callback: Function): Promise<void>;
}
/**
*/
export class RetEx {
  free(): void;
/**
* @param {number} total
* @param {string} return_msg
*/
  constructor(total: number, return_msg: string);
/**
*/
  msg: string;
/**
*/
  total: number;
}
