'use strict';
var steamService = require('../services/steam');

module.exports = {
  resolveVanityUrl: function (url) {
    return steamService.resolveVanityUrl(url);
  }
};
