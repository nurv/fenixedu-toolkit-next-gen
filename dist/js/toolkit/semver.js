"use strict";

System.register([], function (_export, _context) {
  var _createClass, SemVer;

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

      SemVer = function () {
        function SemVer(version) {
          _classCallCheck(this, SemVer);

          var match = /^[^\d]*(\d+)\.(\d+)(\.(\d+))?(.*)?/g.exec(version);

          if (!match) {
            return null;
          }

          this.major = parseInt(match[1]);
          this.minor = parseInt(match[2]);
          this.revision = parseInt(match[4] || 0);

          var rest = match[4];
          if (rest) {
            if (rest == "-SNAPSHOT") {
              this.snapshot = true;
            }

            match = rest.toUpperCase().match(/^[\-\.]?A(LPHA)?\-?(\d+)/);

            if (match) {
              this.alpha = parseInt(match[2]);
            }

            match = rest.toUpperCase().match(/^[\-\.]?B(ETA)?[\-\.]?(\d+)/);

            if (match) {
              this.beta = parseInt(match[2]);
            }

            match = rest.toUpperCase().match(/^[\-\.]?RC(\d+)/);

            if (match) {
              this.releaseCandidate = parseInt(match[1]);
            }

            match = rest.toUpperCase().match(/^[\-\.]?M(\d+)/);
            if (match) {
              this.milestone = parseInt(match[1]);
            }
          }

          this.version = version;
        }

        _createClass(SemVer, [{
          key: "toString",
          value: function toString() {
            return this.version;
          }
        }, {
          key: "cmp",
          value: function cmp(that) {
            if (this.major !== that.major) {
              return this.major - that.major;
            }

            if (this.minor !== that.minor) {
              return this.minor - that.minor;
            }

            if (this.revision !== that.revision) {
              return this.revision - that.revision;
            }
            var props = ["alpha", "beta", "milestone", "releaseCandidate", "snapshot"];
            var k = 0;

            var vThis = this;
            var vThat = that;
            var result;
            $.map(props, function (p) {
              if (vThis[p]) {
                var l = k;
                $.map(props, function (s) {
                  if (vThat[s]) {
                    if (s == p) {
                      if (s === "snapshot") {
                        result = result || 0;
                      } else {
                        result = result || vThis[p] - vThat[s];
                      }
                    } else {
                      result = result || l;
                    }
                  }
                  l -= 1;
                });
                result = result || l;
              }
              k += 1;
            });
            return result || 0;
          }
        }, {
          key: "before",
          value: function before(version, cb) {
            if (typeof version === "string") {
              version = new SemVer(version);
            }

            if (this.cmp(version) <= 0) {
              try {
                cb(version);
              } catch (e) {
                console.error(e);
              }
            }

            return this;
          }
        }, {
          key: "after",
          value: function after(version, cb) {
            if (typeof version === "string") {
              version = new SemVer(version);
            }

            if (this.cmp(version) >= 0) {
              try {
                cb(version);
              } catch (e) {
                console.error(e);
              }
            }

            return this;
          }
        }, {
          key: "between",
          value: function between(v1, v2, cb) {
            if (typeof v1 === "string") {
              v1 = new SemVer(v1);
            }

            if (typeof v2 === "string") {
              v2 = new SemVer(v2);
            }

            if (this.cmp(v1) >= 0 && this.cmp(v2) <= 0) {
              try {
                cb(v1, v2);
              } catch (e) {
                console.error(e);
              }
            }

            return this;
          }
        }]);

        return SemVer;
      }();
    }
  };
});
//# sourceMappingURL=semver.js.map
