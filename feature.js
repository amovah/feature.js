/*!
 * FEATURE.JS 1.0.1, A Fast, simple and lightweight browser feature
 * detection library in just 1kb.
 *
 * http://featurejs.com
 *
 * CSS 3D Transform, CSS Transform, CSS Transition, Canvas, SVG,
 * addEventListener, querySelectorAll, matchMedia, classList API,
 * placeholder, localStorage, History API, Viewport Units, REM Units,
 * CORS, WebGL, Service Worker, Context Menu, Geolocation,
 * Device Motion, Device Orientation, Touch, Async, Defer,
 * Srcset, Sizes & Picture Element.
 *
 *
 * USAGE EXAMPLE:
 * if (feature.webGL) {
 *   console.log("webGL supported!");
 * }
 *
 * Author: @viljamis, https://viljamis.com
 */

/* globals DocumentTouch */
;(function (window, document, undefined) {
  "use strict";

  // For minification only
  var docEl = document.documentElement;


  /**
   * Utilities
   */
  var util = {

    /**
     * Simple create element method
     */
    create : function(el) {
      return document.createElement(el);
    },

    /**
     * Test if it's an old device that we want to filter out
     */
    old : !!(/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent)),

    /**
     * Function that takes a standard CSS property name as a parameter and
     * returns it's prefixed version valid for current browser it runs in
     */
    pfx : (function() {
      var style = document.createElement("dummy").style;
      var prefixes = ["Webkit", "Moz", "O", "ms"];
      var memory = {};
      return function(prop) {
        if (typeof memory[prop] === "undefined") {
          var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
            props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");
            memory[prop] = null;
          for (var i in props) {
            if (style[props[i]] !== undefined) {
              memory[prop] = props[i];
              break;
            }
          }
        }
        return memory[prop];
      };
    })()

  };


  /**
   * The Feature.js object
   */

  var Feature = {
    // Test if CSS 3D transforms are supported
    css3Dtransform : function() {
      var test = (!util.old && util.pfx("perspective") !== null);
      return !!test;
    },

    // Test if CSS transforms are supported
    cssTransform : function() {
      var test = (!util.old && util.pfx("transformOrigin") !== null);
      return !!test;
    },

    // Test if CSS transitions are supported
    cssTransition : function() {
      var test = util.pfx("transition") !== null;
      return !!test;
    },

    // Test if addEventListener is supported
    addEventListener : function() {
      return !!window.addEventListener;
    },

    // Test if querySelectorAll is supported
    querySelectorAll : function() {
      return document.querySelectorAll;
    },

    // Test if matchMedia is supported
    matchMedia : function() {
      return window.matchMedia;
    },

    // Test if Device Motion is supported
    deviceMotion : function() {
      return ("DeviceMotionEvent" in window);
    },

    // Test if Device Orientation is supported
    deviceOrientation : function() {
      return ("DeviceOrientationEvent" in window);
    },

    // Test if Context Menu is supported
    contextMenu : function() {
      return ("contextMenu" in docEl && "HTMLMenuItemElement" in window);
    },

    // Test if classList API is supported
    classList : function() {
      return ("classList" in docEl);
    },

    // Test if placeholder attribute is supported
    placeholder : function() {
      return ("placeholder" in util.create("input"));
    },

    // Test if localStorage is supported
    localStorage : function() {
      try {
        return ('setItem' in localStorage && 'removeItem' in localStorage);
      } catch(err) {
        return false;
      }
    },

    // Test if History API is supported
    historyAPI : function() {
      return (window.history && "pushState" in window.history);
    },

    // Test if ServiceWorkers are supported
    serviceWorker : function() {
      return ("serviceWorker" in navigator);
    },

    // Test if viewport units are supported
    viewportUnit : function() {
      var el = util.create('dummy');
      try {
        el.style.width = "1vw";
        var test = el.style.width !== "";
        return !!test;
      } catch(err) {
        return false;
      }
    },

    // Test if REM units are supported
    remUnit : function() {
      var el = util.create('dummy');
      try {
        el.style.width = "1rem";
        var test = el.style.width !== "";
        return !!test;
      } catch(err) {
        return false;
      }
    },

    // Test if Canvas is supported
    canvas : function() {
      var el = util.create('dummy');
      return !!(el.getContext && el.getContext("2d"));
    },

    // Test if SVG is supported
    svg : function() {
      return !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    },

    // Test if WebGL is supported
    webGL : function() {
      var el = util.create('dummy');
      try {
        return !!(window.WebGLRenderingContext && (el.getContext("webgl") || el.getContext("experimental-webgl")));
      } catch(err) {
        return false;
      }
    },

    // Test if cors is supported
    cors : function() {
      return ("XMLHttpRequest" in window && "withCredentials" in new XMLHttpRequest());
    },

    // Tests if touch events are supported, but doesn't necessarily reflect a touchscreen device
    touch : function() {
      return !!(("ontouchstart" in window) || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch);
    },

    // Test if async attribute is supported
    async : function() {
      return ("async" in util.create("script"));
    },

    // Test if defer attribute is supported
    defer : function() {
      return ("defer" in util.create("script"));
    },

    // Test if Geolocation is supported
    geolocation : function() {
      return ("geolocation" in navigator);
    },

    // Test if img srcset attribute is supported
    srcset : function() {
      return ("srcset" in util.create("img"));
    },

    // Test if img sizes attribute is supported
    sizes : function() {
      return ("sizes" in util.create("img"));
    },

    // Test if Picture element is supported
    pictureElement : function() {
      return ("HTMLPictureElement" in window);
    },

    // Run all the tests and add supported classes
    testAll : function() {
      var classes = " js";
      for (var test in this) {
        if (test !== "testAll" && test !== "constructor" && this[test]) {
          classes += " " + test();
        }
      }
      docEl.className += classes.toLowerCase();
    }

  };

  /**
   * Expose a public-facing API
   */
  window.feature = Feature;

}(window, document));
