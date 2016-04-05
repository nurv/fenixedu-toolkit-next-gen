"use strict";

System.register(["toolkit/locales"], function (_export, _context) {
    var currentLocale, _createClass, _typeof, LocalizedString;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_toolkitLocales) {
            currentLocale = _toolkitLocales.currentLocale;
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

            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };
            function uniqueArray(arr) {
                var u = {},
                    a = [];
                for (var i = 0, l = arr.length; i < l; ++i) {
                    if (u.hasOwnProperty(arr[i])) {
                        continue;
                    }
                    a.push(arr[i]);
                    u[arr[i]] = 1;
                }
                return a;
            }
            _export("uniqueArray", uniqueArray);

            ;

            function updateAttrs(input, widgetInput, allowedAttrs) {
                input = $(input);

                var cache = widgetInput.data("attrCache");

                if (cache) {
                    // If the attribute was removed after attaching to dom;
                    for (var i = 0; i < cache.length; i++) {
                        var attr = cache[i];
                        if (hasAttr(input, attr)) {
                            widgetInput.removeAttr(attr);
                        }
                    };
                }

                cache = [];

                $.each(input[0].attributes, function (i, attrib) {
                    if (!(allowedAttrs.indexOf(attrib.name) < 0)) {
                        widgetInput.attr(attrib.name, attrib.value);
                        cache.push(attrib.name);
                    }
                });

                widgetInput.data("attrCache", cache);
            }
            _export("updateAttrs", updateAttrs);

            ;

            function hasAttr(obj, attr) {
                var val = $(obj).attr(attr);
                return (typeof val === "undefined" ? "undefined" : _typeof(val)) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) && val !== false;
            }
            _export("hasAttr", hasAttr);

            ;

            function replaceRequired(input) {
                input = $(input);

                if (hasAttr(input, 'required')) {
                    input.removeAttr("required");
                    input.attr("bennu-required", "required");
                }
            }

            _export("replaceRequired", replaceRequired);

            function gensym() {
                var text = "";
                var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                return text;
            }

            _export("gensym", gensym);

            function closest(el, selector) {
                var matchesFn;

                // find vendor prefix
                ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
                    if (typeof document.body[fn] == 'function') {
                        matchesFn = fn;
                        return true;
                    }
                    return false;
                });

                // traverse parents
                while (el !== null) {
                    parent = el.parentElement;
                    if (parent !== null && parent[matchesFn](selector)) {
                        return parent;
                    }
                    el = parent;
                }

                return null;
            }

            _export("closest", closest);

            function insertAfter(newNode, referenceNode) {
                referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
            }

            _export("insertAfter", insertAfter);

            function cloneObject(obj) {
                if (obj === null || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || 'isActiveClone' in obj) return obj;

                if (obj instanceof Date) var temp = new obj.constructor(); //or new Date(obj);
                else var temp = obj.constructor();

                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        obj['isActiveClone'] = null;
                        temp[key] = clone(obj[key]);
                        delete obj['isActiveClone'];
                    }
                }

                return temp;
            }

            _export("cloneObject", cloneObject);

            _export("LocalizedString", LocalizedString = function () {
                function LocalizedString() {
                    _classCallCheck(this, LocalizedString);

                    switch (arguments.length) {
                        case 0:
                            this.data = {};
                            break;
                        case 1:
                            this.data = arguments[0];
                            break;
                        case 2:
                            this.data = {};
                            this.data[arguments[0]] = arguments[1];
                    }
                }

                _createClass(LocalizedString, [{
                    key: "get",
                    value: function get() {
                        var locale;
                        var exactMatch = arguments.length === 3 ? arguments[2] : false;
                        if (arguments.length === 0) {
                            locale = currentLocale;
                        } else {
                            locale = arguments[0];
                        }

                        if (locale && typeof locale !== "string") {
                            var tag = locale.tag;
                        } else if (!locale) {
                            var tag = Bennu.locale.tag;
                        } else {
                            var tag = locale;
                        }

                        if (tag in input) {
                            return input[tag];
                        }

                        tag = tag.split('-')[0];

                        if (tag in input) {
                            return input[tag];
                        }

                        for (var lang in input) {
                            if (lang.indexOf(tag) === 0) {
                                return input[lang];
                            }
                        }

                        return exactMatch ? null : input[Object.keys(input)[0]];
                    }
                }, {
                    key: "set",
                    value: function set() {
                        if (arguments.length === 1) {
                            this.data[currentLocale] = arguments[0];
                        } else {
                            return this.data[arguments[1]] = arguments[0];
                        }
                    }
                }, {
                    key: "json",
                    value: function json() {
                        return this.data;
                    }
                }, {
                    key: "getLocales",
                    value: function getLocales() {
                        var res = [];
                        for (var k in this.data) {
                            res.push(k);
                        }
                        return res;
                    }
                }, {
                    key: "toString",
                    value: function toString() {
                        return JSON.stringify(this.data);
                    }
                }]);

                return LocalizedString;
            }());

            _export("LocalizedString", LocalizedString);
        }
    };
});
//# sourceMappingURL=utils.js.map
