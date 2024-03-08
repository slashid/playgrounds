import { getBooleanEnvValue } from "~/services/environment-variables";

/**
 * Starts a timer that can be used to compute the duration of an operation. Timers
 * are identified by a unique `label`. Use the same `label` when calling `timeEnd()` to stop the timer and output the elapsed time in
 * suitable time units to `stdout`. For example, if the elapsed
 * time is 3869ms, `timeEnd()` displays "3.869s".
 */
export function timeStart(label?: string) {
  if (!getBooleanEnvValue("PERFORMANCE_LOGGING_ENABLED")) return;
  console.time(label);
}

/**
 * Stops a timer that was previously started by calling `timeStart()` and
 * prints the result to `stdout`:
 *
 * ```js
 * timeStart('100-elements');
 * for (let i = 0; i < 100; i++) {}
 * timeEnd('100-elements');
 * // prints 100-elements: 225.438ms
 * ```
 */
export function timeEnd(label?: string) {
  if (!getBooleanEnvValue("PERFORMANCE_LOGGING_ENABLED")) return;
  console.timeEnd(label);
}
