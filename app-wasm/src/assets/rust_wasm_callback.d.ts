/* tslint:disable */
/* eslint-disable */
/**
* @param {number} count
* @param {Function} callback
*/
export function callback_ex(count: number, callback: Function): void;
/**
* This sample shows how you can passa a counter and receive call back or a error message
* if the callback funtion is empty
* @param {number} count
* @param {Function | undefined} callback
*/
export function callback_ex_with_option(count: number, callback?: Function): void;
/**
*/
export class ExClass {
  free(): void;
/**
*/
  constructor();
/**
* @param {number} counter
* @returns {RetEx}
*/
  ex_function(counter: number): RetEx;
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
