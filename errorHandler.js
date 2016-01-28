
var defaultMessage = "";
defaultMessage += "An unknown error has occured. Please email ";
defaultMessage += "your issue in detail to untroboticsclub@gmail.com ";
defaultMessage += "and we will resolve it ASAP. ";
defaultMessage += "Thanks.";

// options notes:
// options = {
//   status: "The HTTP status code applicable to this problem, expressed as a string value.",
//   code: "An application-specific error code, expressed as a string value",
//   title: "A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.",
//   detail: "A human-readable explanation specific to this occurrence of the problem. Like title, this field's value can be localized."
// }

/**
 * This will generate an appropriate JSON object
 * adhering to the JSON API specification for errors.
 * @param {object} options An object with a few select params that may be used to
 *                         describe the error to the user, and to potentially
 *                         help the user resolve it.
 */
module.exports = function(options) {
  var _options = options || {};
  this.id = Date.now(); // a unique identifier for this particular occurrence of the problem.
  this.status = _options.status || "500";
  this.code = _options.code || "9001";
  this.title = _options.title || "Unknown Error";
  this.detail = _options.detail || defaultMessage;
};
