/** return the base domain/ip/url of this server
 *
 * @param {*} req
 * @returns String base url
 */
exports.url = function (req) {
  return req.protocol + "://" + req.get("host");
};

/** check if url supplied is valid
 *
 * @param {*} url
 * @returns Boolean returns true or false
 */
exports.validateURL = function (url) {
  const res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};
