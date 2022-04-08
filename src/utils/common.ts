/**
 * Check if object is empty or false (null, undefined...)
 * @param object generic Object 
 * @returns boolean
 */
export const isEmptyOrNull = (object: object): boolean => !object || Object.keys(object).length === 0  