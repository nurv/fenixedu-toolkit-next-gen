'use strict';

System.register([], function (_export, _context) {
  var _createClass, Observe;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      System.import('/lib/MutationObserverPolyfill.js');

      _export('Observe', Observe = function () {
        function Observe() {
          _classCallCheck(this, Observe);
        }

        _createClass(Observe, null, [{
          key: 'element',
          value: function element(target, config, callback) {
            var observer = new MutationObserver(function (mutations) {
              callback(mutations);
            });
            observer.observe(target, config);
          }
        }]);

        return Observe;
      }());

      _export('Observe', Observe);
    }
  };
});
//# sourceMappingURL=observers.js.map
