const _ = require("lodash");

const CommonFunctions = (function () {
  function safelyParseStr(ip) {
    if (_.isEmpty(ip)) {
      return ip;
    }

    if (_.isString(ip)) {
      return JSON.parse(ip);
    } else if (_.isObject(ip)) {
      return ip;
    } else if (typeof ip == "object") {
      return JSON.parse(JSON.stringify(ip));
    } else {
      return ip;
    }
  }

  return {
    safelyParseStr,
  };
})();

module.exports = CommonFunctions;
