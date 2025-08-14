/*! jUrl v@VERSION | @DATE | [@BUNDLE] */
(function (global) {
    "use strict";

    if (typeof global !== "object" || !global) {
        throw new Error("jUrl requires a window");
    }

    if (typeof global.jUrl !== "undefined") {
        throw new Error("jUrl is already defined");
    }

    // @CODE 

    global.jUrl = jUrl;

})(typeof window !== "undefined" ? window : this);