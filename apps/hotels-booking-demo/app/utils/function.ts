type Function = (...params: any[]) => any;

/**
 * Runs functions with the given args, returns true if any of the functions return a truthy value
 */
export const or =
  (...functions: Function[]) =>
  (...params: any[]) => {
    return functions.some((fn) => fn(...params));
  };

/**
 * Runs functions with the given args, returns true if all of the functions return a truthy value
 */
export const and =
  (...functions: Function[]) =>
  (...params: any[]) =>
    functions.every((callback) => callback(...params));

/**
 * Runs a function with the given args, returns true if the function returns a falsy value
 */
export const not =
  (callback: Function) =>
  (...params: any[]) =>
    !callback(...params);
