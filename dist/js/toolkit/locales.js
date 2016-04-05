"use strict";

System.register([], function (_export, _context) {
  var currentLocale, avaibleLocales, currentLang;
  return {
    setters: [],
    execute: function () {
      _export("currentLocale", currentLocale = {
        "tag": "en-GB",
        "displayName": "English (United Kingdom)",
        "lang": "en"
      });

      _export("currentLocale", currentLocale);

      _export("avaibleLocales", avaibleLocales = [{
        "tag": "pt-PT",
        "displayName": "português (Portugal)",
        "lang": "pt"
      }, currentLocale]);

      _export("avaibleLocales", avaibleLocales);

      _export("currentLang", currentLang = "en");

      _export("currentLang", currentLang);

      function getLocale(tag) {
        for (var i = 0; i < avaibleLocales.length; i++) {
          if (avaibleLocales[i].tag === tag) {
            return avaibleLocales[i];
          }
        }
        return null;
      }

      _export("getLocale", getLocale);
    }
  };
});
//# sourceMappingURL=locales.js.map
