'use strict';

var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';

function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}

function addClass (el, className) {
  var current = el.className;
  try {
    if (!current.length) {
      el.className = className;
    } else if (!lookupClass(className).test(current)) {
      el.className += ' ' + className;
    }
  } catch (ignored) {
    el.classList.add(className);
  }
}

function rmClass (el, className) {
  try {
    el.className = el.className.replace(lookupClass(className), ' ').trim();
  } catch (ignored) {
    el.classList.remove(className);
  }
}

module.exports = {
  add: addClass,
  rm: rmClass
};
