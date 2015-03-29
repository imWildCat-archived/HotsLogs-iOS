'use strict';

var get = function(url) {
  return fetch(url).then((response) => response.text());
};

exports.get = get;