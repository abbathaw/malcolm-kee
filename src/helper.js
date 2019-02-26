export function debounce(fn, wait) {
  var timeout;

  return function(...args) {
    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      fn.apply(context, args);
    }, wait);
  };
}

export function throttle(fn, wait = 250, context = this) {
  let timeout = null;
  let args = null;

  const later = () => {
    fn.apply(context, args);
    timeout = null;
  };

  return function(...ars) {
    if (!timeout) {
      args = ars;
      timeout = setTimeout(later, wait);
    }
  };
}

/**
 *
 * @param {number} readtime
 */
export function getReadtimeText(readtime) {
  return readtime && readtime > 1
    ? `${readtime} minutes`
    : `${readtime} minute`;
}

export const callAll = (...fns) => (...args) =>
  fns.forEach(fn => typeof fn === 'function' && fn(...args));
