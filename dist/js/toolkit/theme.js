"use strict";

System.register([], function (_export, _context) {
    var cache;


    function hackColor(cls) {
        if (!(cls in cache)) {
            var a = $("<button style='display:none;' class='btn btn-" + cls + "'></button>");
            $(document.body).append(a);
            var color = a.css("backgroundColor");
            a.remove();
            cache[cls] = color;
            return color;
        } else {
            return cache[cls];
        }
    }

    function hackParagraph() {
        if (!("paragraph" in cache)) {
            var a = $("<p style='display:none;'></p>");
            $(document.body).append(a);
            var font = a.css("fontFamily");
            a.remove();
            cache["paragraph"] = font;
            return font;
        } else {
            return cache["paragraph"];
        }
    }

    function hackHeading() {
        if (!("heading" in cache)) {
            var a = $("<h1 style='display:none;'></h1>");
            $(document.body).append(a);
            var font = a.css("fontFamily");
            a.remove();
            cache["heading"] = font;
            return font;
        } else {
            return cache["heading"];
        }
    }

    return {
        setters: [],
        execute: function () {
            cache = {};
            function hFontFamily() {
                return hackHeading();
            }
            _export("hFontFamily", hFontFamily);

            ;

            function pFontFamily() {
                return hackParagraph();
            }
            _export("pFontFamily", pFontFamily);

            ;

            function primary() {
                return hackColor("primary");
            }
            _export("primary", primary);

            ;

            function success() {
                return hackColor("success");
            }
            _export("success", success);

            ;

            function info() {
                return hackColor("info");
            }
            _export("info", info);

            ;

            function warning() {
                return hackColor("warning");
            }
            _export("warning", warning);

            ;

            function danger() {
                return hackColor("danger");
            }
            _export("danger", danger);

            ;
        }
    };
});
//# sourceMappingURL=theme.js.map
