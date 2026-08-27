const getSiblings = function (elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

const getClosest = function (elem, selector) {
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};


function slideToggle(el, duration, callback) {
  if (el.clientHeight === 0) {
    _s(el, duration, callback, true);
  } else {
    _s(el, duration, callback);
  }
}
function slideUp(el, duration, callback) {
  _s(el, duration, callback);
}
function slideDown(el, duration, callback) {
  _s(el, duration, callback, true);
}
function _s(el, duration, callback, isDown) {
  if (typeof duration === 'undefined') duration = 300;
  if (typeof isDown === 'undefined') isDown = false;
  el.style.overflow = "hidden";
  if (isDown) el.style.display = "block";
  var elStyles        = window.getComputedStyle(el);
  var elHeight        = parseFloat(elStyles.getPropertyValue('height'));
  var elPaddingTop    = parseFloat(elStyles.getPropertyValue('padding-top'));
  var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
  var elMarginTop     = parseFloat(elStyles.getPropertyValue('margin-top'));
  var elMarginBottom  = parseFloat(elStyles.getPropertyValue('margin-bottom'));
  var stepHeight        = elHeight        / duration;
  var stepPaddingTop    = elPaddingTop    / duration;
  var stepPaddingBottom = elPaddingBottom / duration;
  var stepMarginTop     = elMarginTop     / duration;
  var stepMarginBottom  = elMarginBottom  / duration;
  var start;
  function step(timestamp) {
    if (start === undefined) start = timestamp;
    var elapsed = timestamp - start;
    if (isDown) {
      el.style.height        = (stepHeight        * elapsed) + "px";
      el.style.paddingTop    = (stepPaddingTop    * elapsed) + "px";
      el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
      el.style.marginTop     = (stepMarginTop     * elapsed) + "px";
      el.style.marginBottom  = (stepMarginBottom  * elapsed) + "px";
    } else {
      el.style.height        = elHeight        - (stepHeight        * elapsed) + "px";
      el.style.paddingTop    = elPaddingTop    - (stepPaddingTop    * elapsed) + "px";
      el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
      el.style.marginTop     = elMarginTop     - (stepMarginTop     * elapsed) + "px";
      el.style.marginBottom  = elMarginBottom  - (stepMarginBottom  * elapsed) + "px";
    }
    if (elapsed >= duration) {
      el.style.height        = "";
      el.style.paddingTop    = "";
      el.style.paddingBottom = "";
      el.style.marginTop     = "";
      el.style.marginBottom  = "";
      el.style.overflow      = "";
      if (!isDown) el.style.display = "none";
      if (typeof callback === 'function') callback();
    } else {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}


const slugify = function (text) {
  return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
};

const excerpt = (string, length, delim, appendinx) => {
  if(string.length <= length) return string;

  let trimmedStr = string.substr(0, length + delim.length);
  
  let lastDelimIndex = trimmedStr.lastIndexOf(delim);
  if(lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);

  if(trimmedStr) trimmedStr += appendinx;

  return trimmedStr;
}

export {
  getSiblings,
  getClosest,
  slideUp,
  slideDown,
  slideToggle,
  slugify,
  excerpt
};
