(function () {
  function protect(func) {
    return function () {
      return func.apply(null, clone(Array.prototype.slice.call(arguments)));
    };
  }

  module.exports = {
    protect: protect,
    protectObject: function (obj) {
      var copy = clone(obj);
      var keys = Object.keys(copy);
      keys.forEach(function (key) {
        if (typeof obj[key] === 'function') {
          copy[key] = protect(obj[key]);
        }
      });
      return copy;
    }
  };

  /**
   * Deep Copy (MDN)
   * @see https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/The_structured_clone_algorithm
   */
  function clone(objectToBeCloned) {
    // Basis.
    if (!(objectToBeCloned instanceof Object)) {
      return objectToBeCloned;
    }

    var objectClone;

    // Filter out special objects.
    var Constructor = objectToBeCloned.constructor;
    switch (Constructor) {
      // Implement other special objects here.
    case RegExp:
      objectClone = new Constructor(objectToBeCloned);
      break;
    case Date:
      objectClone = new Constructor(objectToBeCloned.getTime());
      break;
    default:
      objectClone = new Constructor();
    }

    // Clone each property.
    for (var prop in objectToBeCloned) {
      objectClone[prop] = clone(objectToBeCloned[prop]);
    }

    return objectClone;
  }

})();
