'use strict';
var main = require('./main');

module.exports = {
  getSteamId: function (id) {
    // steam id is 17 digits
    var steamIdPattern = /^\d{17}$/;

    // if a steam id is already given, we don't need to resolve it.
    if (steamIdPattern.test(id)) {
      return {
        response: {
          steamid: id,
          success: 1
        }
      };
    } else {
      // it's not an id and we need to resolve the url
      return main.resolveVanityUrl(id);
    }
  }
};
