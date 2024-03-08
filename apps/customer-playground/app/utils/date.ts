/**
 * Returns the current year
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Returns the current date as a string value in ISO format, optionally adding a number of days to the current date.
 */
export function getDate(numberOfDaysToAdd?: number) {
  if (!numberOfDaysToAdd) return new Date().toISOString();

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

  return currentDate.toISOString();
}

/**
 * Returns the current time as a string value in the format HH:MM
 */
export function getTime(timestamp: string) {
  const currentDate = new Date(timestamp);
  const minutes = currentDate.getMinutes();
  return `${currentDate.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

/**
 * Returns the current date as a string value in the format MMM DD, YYYY
 */
export function formatDate(timestamp: string) {
  const currentDate = new Date(timestamp).toDateString();
  const [, month, day, year] = currentDate.split(" ");

  return `${month} ${day}, ${year}`;
}
