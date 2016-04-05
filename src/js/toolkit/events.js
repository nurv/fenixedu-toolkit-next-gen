function prefixForEvent(a) {
    a[0] = a[0].split(" ").map(function (e) {
        return "bennu-toolkit-" + e;
    }).reduce(function (x, y) {
        return x + " " + y;
    });
}

export function on () {
    prefixForEvent(arguments);
    var q = $("html");
    q.on.apply(q, arguments);
};

export function off () {
    prefixForEvent(arguments);
    var q = $("html");
    q.off.apply(q, arguments);
};

export function trigger () {
    prefixForEvent(arguments);
    var q = $("html");
    q.trigger.apply(q, arguments);
};