/**
 * Returns the current date in 'YYYY-MM-DD' format.
 * @returns {string} - Current date in 'YYYY-MM-DD' format.
 */
export const getCurrentDate = () => {
  return new Date().toJSON().slice(0, 10).replace(/-/g, "-");
};

/**
 * Formats the given date into a string with the specified format.
 * @param {Date} date - The date to be formatted. Defaults to the current date.
 * @returns {string} - Formatted date string in the format 'DD-MMM-YYYY HH:mm:ss'.
 */
export const formatDate = (date = new Date()) => {
  const options = { month: "short" };

  const day = String(date.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat("en-US", options).format(date);
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
