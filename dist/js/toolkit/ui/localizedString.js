"use strict";

System.register(["toolkit/ui/widgets", "toolkit/locales", "toolkit/observers"], function (_export, _context) {
  var InputWidget, UIRegister, UIOutlet, UIView, UIAttribute, UIOn, avaibleLocales, currentLocale, getLocale, Observe, _createClass, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _dec10, _dec11, _class4, _desc2, _value2, _class5, _descriptor8, _dec12, _dec13, _class7, _desc3, _value3, _class8, _descriptor9, LocalizedStringWidget, InputLocalizedStringWidget, TextAreaLocalizedStringWidget;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

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

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  function getSingleTag(locale) {
    return locale.tag.split("-")[0].toUpperCase();
  }

  return {
    setters: [function (_toolkitUiWidgets) {
      InputWidget = _toolkitUiWidgets.InputWidget;
      UIRegister = _toolkitUiWidgets.UIRegister;
      UIOutlet = _toolkitUiWidgets.UIOutlet;
      UIView = _toolkitUiWidgets.UIView;
      UIAttribute = _toolkitUiWidgets.UIAttribute;
      UIOn = _toolkitUiWidgets.UIOn;
    }, function (_toolkitLocales) {
      avaibleLocales = _toolkitLocales.avaibleLocales;
      currentLocale = _toolkitLocales.currentLocale;
      getLocale = _toolkitLocales.getLocale;
    }, function (_toolkitObservers) {
      Observe = _toolkitObservers.Observe;
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

      LocalizedStringWidget = (_dec = UIOutlet(".fenixedu-toolkit-localized-string-menu"), _dec2 = UIOutlet(".fenixedu-toolkit-localized-string-button-long"), _dec3 = UIOutlet(".fenixedu-toolkit-localized-string-button-short"), _dec4 = UIOutlet(".fenixedu-toolkit-localized-string-language"), _dec5 = UIOutlet(".fenixedu-toolkit-localized-string-tag"), _dec6 = UIAttribute("name"), _dec7 = UIAttribute("locale"), _dec8 = UIOn("input", ".form-control"), _dec9 = UIOn("propertychange", ".form-control"), UIView(_class = (_class2 = function (_InputWidget) {
        _inherits(LocalizedStringWidget, _InputWidget);

        function LocalizedStringWidget() {
          var _Object$getPrototypeO;

          var _temp, _this, _ret;

          _classCallCheck(this, LocalizedStringWidget);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(LocalizedStringWidget)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _initDefineProp(_this, "menu", _descriptor, _this), _initDefineProp(_this, "longButton", _descriptor2, _this), _initDefineProp(_this, "shortButton", _descriptor3, _this), _initDefineProp(_this, "language", _descriptor4, _this), _initDefineProp(_this, "tag", _descriptor5, _this), _initDefineProp(_this, "name", _descriptor6, _this), _initDefineProp(_this, "locale", _descriptor7, _this), _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(LocalizedStringWidget, [{
          key: "update",
          value: function update() {
            var localeObj = getLocale(this.locale);
            var val = this.value;

            if (val === "") {
              this.value = "{}";
              val = "{}";
            }

            var val = JSON.parse(val);
            var tag = localeObj.tag;

            if (!(tag in val)) {
              var singleTag = getSingleTag(localeObj).toLowerCase();
              if (singleTag in val) {
                tag = singleTag;
              }
            }

            val = val[tag];
            if (val !== this.presentationValue) {
              this.presentationValue = val || "";
              this.language.innerHTML = localeObj.displayName;
              this.tag.innerHTML = localeObj.tag;
            }
          }
        }, {
          key: "makeMenu",
          value: function makeMenu(callback) {
            var _this2 = this;

            for (var i = 0; i < avaibleLocales.length; i++) {
              var locale = avaibleLocales[i];
              var menuOption = document.createElement("li");
              var a = document.createElement("a");
              a.setAttribute("href", "#");
              a.setAttribute("onclick", "return false;");
              a.innerHTML = locale.displayName || locale.tag;
              menuOption.appendChild(a);

              a.setAttribute("data-locale", locale.tag);

              menuOption.addEventListener("click", function (x) {
                return _this2.locale = x.target.getAttribute("data-locale");
              });
              this.menu.appendChild(menuOption);
            }
          }
        }, {
          key: "change",
          value: function change(evt) {
            var data = JSON.parse(this.value);

            var locale = getLocale(this.locale);
            var tag = locale.tag;

            if (!(tag in data)) {
              var singleTag = getSingleTag(locale).toLowerCase();
              if (singleTag in data) {
                tag = singleTag;
              }
            }

            data[tag] = this.presentationValue;
            this.value = JSON.stringify(data);
            var event = new CustomEvent("change", { "target": this, cancelable: false, bubbles: false, type: "change" });
            document.dispatchEvent(event);
          }
        }, {
          key: "attachedCallback",
          value: function attachedCallback() {
            var _this3 = this;

            this._disabled = false;
            this.makeMenu();
            this.recalculateButtons();
            this.addEventListener("resize", function () {
              return _this3.recalculateButtons();
            });

            this.onchange = function () {
              this.update();
            };

            this.locale = currentLocale.tag;

            Observe.element(this, {
              attributes: true
            }, function (mutations) {
              if (mutations) {
                if (mutations.filter(function (x) {
                  return x.type == "attributes" && x.attributeName == "locale";
                }).length > 0) {
                  _this3.update();
                }
              }
            });
          }
        }, {
          key: "setTagButton",
          value: function setTagButton(locale, tagButton) {
            if (tagButton && tagButton.length) {
              tagButton.html(getSingleTag(locale));
            };
          }
        }, {
          key: "recalculateButtons",
          value: function recalculateButtons() {
            var el = this.view.querySelectorAll(".fenixedu-toolkit-localized-string-input-group");
            for (var i = 0; i < el.length; i++) {
              var e = el[i];
              var z = e.querySelector(".fenixedu-toolkit-localized-string-button-long");
              var x = e.querySelector(".fenixedu-toolkit-localized-string-button-short");
              if (x && z) {
                if (z.offsetWidth / e.offsetWidth > 1 / 3) {
                  if (z.style.display !== "none") {
                    x.style.display = "inline";
                    z.style.display = "none";
                  }
                } else {
                  if (x.style.display !== "none") {
                    z.style.display = "inline";
                    x.style.display = "none";
                  }
                }
              }
            }
          }
        }, {
          key: "disabled",
          get: function get() {
            return this._disabled;
          },
          set: function set(value) {
            this._disabled = value;
          }
        }, {
          key: "locale",
          get: function get() {
            return this.getAttribute("locale");
          },
          set: function set(value) {
            if (value == "string") {
              value = getLocale(value);
            }
            this.setAttribute("locale", value.tag);

            this._localeObject = value;
            this.view.querySelector(".fenixedu-toolkit-localized-string-language").innerHTML = value.displayName || getSingleTag(value);
          }
        }]);

        return LocalizedStringWidget;
      }(InputWidget), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "menu", [_dec], {
        enumerable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "longButton", [_dec2], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "shortButton", [_dec3], {
        enumerable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "language", [_dec4], {
        enumerable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "tag", [_dec5], {
        enumerable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec6], {
        enumerable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec7], {
        enumerable: true,
        initializer: null
      }), _applyDecoratedDescriptor(_class2.prototype, "change", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "change"), _class2.prototype)), _class2)) || _class);

      _export("InputLocalizedStringWidget", InputLocalizedStringWidget = (_dec10 = UIRegister("ls-input", "input"), _dec11 = UIOutlet(".fenixedu-toolkit-localized-string-input"), _dec10(_class4 = (_class5 = function (_LocalizedStringWidge) {
        _inherits(InputLocalizedStringWidget, _LocalizedStringWidge);

        function InputLocalizedStringWidget() {
          var _Object$getPrototypeO2;

          var _temp2, _this4, _ret2;

          _classCallCheck(this, InputLocalizedStringWidget);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(InputLocalizedStringWidget)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this4), _initDefineProp(_this4, "inputElement", _descriptor8, _this4), _temp2), _possibleConstructorReturn(_this4, _ret2);
        }

        _createClass(InputLocalizedStringWidget, [{
          key: "render",
          value: function render() {
            return "<div class=\"fenixedu-toolkit-localized-string-input-group\" >\n    <div class=\"input-group\">\n      <input type=\"text\" class=\"form-control fenixedu-toolkit-localized-string-input\">\n      <div class=\"input-group-btn fenixedu-toolkit-localized-string-group dropdown\">\n        <button type=\"button\" class=\" btn btn-default dropdown-toggle fenixedu-toolkit-localized-string-button-long fenixedu-toolkit-localized-string-button\" data-toggle=\"dropdown\">\n          <span class=\"fenixedu-toolkit-localized-string-language\"></span> \n          <span class=\"caret\"></span>\n        </button>\n        <button type=\"button\" class=\" btn btn-default dropdown-toggle fenixedu-toolkit-localized-string-button-short fenixedu-toolkit-localized-string-button\" data-toggle=\"dropdown\">\n          <span class=\"fenixedu-toolkit-localized-string-tag\"></span>\n          <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu fenixedu-toolkit-localized-string-menu pull-right\" role=\"menu\"></ul>\n      </div>\n    </div>\n    <p class=\"help-block\"></p>\n  </div>";
          }
        }, {
          key: "presentationValue",
          get: function get() {
            return this.inputElement.value;
          },
          set: function set(v) {
            this.inputElement.value = v;
          }
        }]);

        return InputLocalizedStringWidget;
      }(LocalizedStringWidget), (_descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "inputElement", [_dec11], {
        enumerable: true,
        initializer: null
      })), _class5)) || _class4));

      _export("InputLocalizedStringWidget", InputLocalizedStringWidget);

      _export("TextAreaLocalizedStringWidget", TextAreaLocalizedStringWidget = (_dec12 = UIRegister("ls-textarea", "textarea"), _dec13 = UIOutlet("fenixedu-toolkit-localized-string-textarea"), _dec12(_class7 = (_class8 = function (_LocalizedStringWidge2) {
        _inherits(TextAreaLocalizedStringWidget, _LocalizedStringWidge2);

        function TextAreaLocalizedStringWidget() {
          var _Object$getPrototypeO3;

          var _temp3, _this5, _ret3;

          _classCallCheck(this, TextAreaLocalizedStringWidget);

          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return _ret3 = (_temp3 = (_this5 = _possibleConstructorReturn(this, (_Object$getPrototypeO3 = Object.getPrototypeOf(TextAreaLocalizedStringWidget)).call.apply(_Object$getPrototypeO3, [this].concat(args))), _this5), _initDefineProp(_this5, "inputElement", _descriptor9, _this5), _temp3), _possibleConstructorReturn(_this5, _ret3);
        }

        _createClass(TextAreaLocalizedStringWidget, [{
          key: "render",
          value: function render() {
            return "<div class=\"fenixedu-toolkit-localized-string-textArea\">\n    <p>\n      <div class=\"btn-group fenixedu-toolkit-localized-string-group\">\n        <button type=\"button\" class=\"btn btn-default dropdown-toggle fenixedu-toolkit-localized-string-button\" data-toggle=\"dropdown\">\n          <span class=\"fenixedu-toolkit-localized-string-language\"></span>\n          <span class=\"caret\"></span>\n        </button>\n\n        <ul class=\"dropdown-menu fenixedu-toolkit-localized-string-menu\" role=\"menu\"></ul>\n      </div>\n    </p>\n    <p>\n      <textarea class=\"form-control fenixedu-toolkit-localized-string-textarea\"></textarea>\n      <p class=\"help-block\">\n    </p>\n  </div>";
          }
        }, {
          key: "presentationValue",
          get: function get() {
            return this.inputElement.value;
          },
          set: function set(v) {
            this.inputElement.value = v;
          }
        }]);

        return TextAreaLocalizedStringWidget;
      }(LocalizedStringWidget), (_descriptor9 = _applyDecoratedDescriptor(_class8.prototype, "inputElement", [_dec13], {
        enumerable: true,
        initializer: null
      })), _class8)) || _class7));

      _export("TextAreaLocalizedStringWidget", TextAreaLocalizedStringWidget);
    }
  };
});
//# sourceMappingURL=localizedString.js.map
