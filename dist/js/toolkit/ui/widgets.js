"use strict";

System.register(["toolkit/utils"], function (_export, _context) {
  var closest, _createClass, InputWidget;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_toolkitUtils) {
      closest = _toolkitUtils.closest;
    }],
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

      _export("InputWidget", InputWidget = function (_HTMLInputElement) {
        _inherits(InputWidget, _HTMLInputElement);

        function InputWidget() {
          _classCallCheck(this, InputWidget);

          return _possibleConstructorReturn(this, Object.getPrototypeOf(InputWidget).apply(this, arguments));
        }

        _createClass(InputWidget, [{
          key: "onsubmit",
          value: function onsubmit() {}
        }, {
          key: "onchange",
          value: function onchange() {}
        }]);

        return InputWidget;
      }(HTMLInputElement));

      _export("InputWidget", InputWidget);

      function UIRegister(name, extds) {
        return function (target, property, descriptor) {
          var opts = {
            prototype: Object.create(target.prototype)
          };
          opts['extends'] = extds;
          document.registerElement(name, opts);
          return target;
        };
      }

      _export("UIRegister", UIRegister);

      function UIOn(code, query) {
        return function (target, property, descriptor) {
          target._eventHandlers = target._eventHandlers || {};
          target._eventHandlers[target.constructor.name] = target._eventHandlers[target.constructor.name] || [];
          target._eventHandlers[target.constructor.name].push({ code: code, name: property, query: query });
          return descriptor;
        };
      }

      _export("UIOn", UIOn);

      function UIOutlet(query) {
        return function (target, property, descriptor) {
          target._outlets = target._outlets || {};
          target._outlets[target.constructor.name] = target._outlets[target.constructor.name] || [];
          target._outlets[target.constructor.name].push({ name: property, query: query });
          descriptor.initializer = null;
          return descriptor;
        };
      }

      _export("UIOutlet", UIOutlet);

      function UIAttribute(name) {
        return function (target, property, descriptor) {
          delete descriptor.initializer;
          delete descriptor.writable;

          descriptor.get = function () {
            return this.getAttribute(name);
          };

          descriptor.set = function (v) {
            this.setAttribute(name, v);
          };

          return descriptor;
        };
      }

      _export("UIAttribute", UIAttribute);

      function UIView(target, property, descriptor) {

        target.prototype.recalculateOutlets = function () {
          console.log(target.prototype.constructor.name);
          if (target.prototype._outlets[target.prototype.constructor.name] && target.prototype._outlets[target.prototype.constructor.name].length) {
            var that = this;
            target.prototype._outlets[target.prototype.constructor.name].forEach(function (x) {
              Object.defineProperty(that, x.name, {
                enumerable: true,
                configurable: false,
                get: function get() {
                  return that.view.querySelector(x.query);
                }
              });
            });
          }
        };

        target.prototype.attachEvtHandlers = function () {
          if (target.prototype._eventHandlers[target.prototype.constructor.name] && target.prototype._eventHandlers[target.prototype.constructor.name].length) {
            var that = this;
            target.prototype._eventHandlers[target.prototype.constructor.name].forEach(function (x) {
              var element = x.query ? that.view.querySelector(x.query) : that.view;
              element.addEventListener(x.code, function (evt) {
                return that[x.name](evt);
              });
            });
          }
        };

        target.prototype.createdCallback = function () {
          var _this2 = this;

          this.setAttribute("style", "display:none;");
          var render = this.render();
          this.view = document.createElement("div");
          this.view.className += "fenixedu-toolkit-sd";
          if (typeof render === "string") {
            this.view.innerHTML = render;
          } else if (HTMLElement.prototype.isPrototypeOf(render)) {
            this.view.appendChild(render);
          } else {
            throw new Error("I don't know how to attach " + render.toString());
          }

          this.parentNode.insertBefore(this.view, this.nextSibling);
          this.recalculateOutlets();
          this.attachEvtHandlers();

          var element = closest(this, "form");

          if (element) {
            element.addEventListener("submit", function (x) {
              return _this2.onsubmit(x);
            });
          }

          this.addEventListener("DOMSubtreeModified", function (x) {
            return _this2.onchange(x);
          }, false);
        };

        return target;
      }

      _export("UIView", UIView);
    }
  };
});
//# sourceMappingURL=widgets.js.map
