
/**
 * 
 * @param {string} input string to be sanitize
 * @returns returns the string removing all the script tags it contains
 */
export const sanitize = (input) => {
  if (typeof input === "string") {
    return input.replace(/(\<script\>|\<\/script\>)/gi, ""); // Remove <script> tags
  }
  return input;
};