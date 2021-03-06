"use strict";

module.exports = function group(_ref) {
  var attributesPath = _ref.attributesPath,
      item = _ref.item,
      input = _ref.input;
  var value = input.value;

  return !!(item[attributesPath] && item[attributesPath].group === value);
};