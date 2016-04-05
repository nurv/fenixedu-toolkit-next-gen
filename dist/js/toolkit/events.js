"use strict";

System.register([], function (_export, _context) {
    function prefixForEvent(a) {
        a[0] = a[0].split(" ").map(function (e) {
            return "bennu-toolkit-" + e;
        }).reduce(function (x, y) {
            return x + " " + y;
        });
    }

    return {
        setters: [],
        execute: function () {
            function on() {
                prefixForEvent(arguments);
                var q = $("html");
                q.on.apply(q, arguments);
            }
            _export("on", on);

            ;

            function off() {
                prefixForEvent(arguments);
                var q = $("html");
                q.off.apply(q, arguments);
            }
            _export("off", off);

            ;

            function trigger() {
                prefixForEvent(arguments);
                var q = $("html");
                q.trigger.apply(q, arguments);
            }
            _export("trigger", trigger);

            ;
        }
    };
});
//# sourceMappingURL=events.js.map
