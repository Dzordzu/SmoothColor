/**
* @class SmoothColor
*
* @constructor SmoothColor(options)
*   @NOTE Currently only rgb(), rgba(), #rrggbbaa, and #rrggbb formats are supported
*
*   @desc options should be in the following form:
*     {
*       @required @prop object,
*       @required @prop from, // rgb, rgba, hex
*       @required @prop to, // rgb, rgba, hex
*       @prop scrollObj, // by default is window @NOTE HAS NOT BEEN IMPLEMENTED YET
*       @prop speed: { @NOTE HAS NOT BEEN FULLY IMPLEMENTED YET. YOU SHOULD NEVER EVER USE USER INPUT TO ANY PROP OF THIS
*         @prop red,
*         @prop green,
*         @prop blue,
*         @prop opacity // alpha layer
*         @desc speed of color/alpha layer transitions to the specific values
*           Every property has to be a math formula (string) with an x as param:
*           @example 2x+7x+(1/x) OR (2x-1)*(x-1)*x
*           It would be great, if you applied function with 0 in x=0 and 1 in x=1 (REALLY, YOU SHOULD DO IT)
*           @SEE https://mycurvefit.com/
*       }
*     }
*/
var SmoothColor = function(options) {

  /*
  * Returns object in the following form {red, green, blue, opacity}
  */
  function parseColors(color) {
    var shortandHex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
    var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
    var rgba = /^rgba\( ?(\d+) ?\, ?(\d+) ?\, ?(\d+) ?\, ?((?:\d+?\.)?\d+) ?\)$/i;
    var rgb = /^rgb\( ?(\d+) ?\, ?(\d+) ?\, ?(\d+) ?\)$/i;

    // Tests if #rgb or #rgba
    if(shortandHex.test(color)) {
      color = color.replace(shortandHex, function(m, r, g, b, a) {
        return r + r + g + g + b + b + (a ? (a + a) : "");
      });
    }
    
    // Tests if #rrggbb OR #rrggbbaa
    if(hex.test(color)) {
      color = hex.exec(color);
      return {
        red: parseInt(color[1], 16),
        green: parseInt(color[2], 16),
        blue: parseInt(color[3], 16),
        opacity: parseInt(color[4], 16)/255 || (parseInt(color[4], 16) === 0 ? 0 : 1)
      }
    }
    
    // Tests if rgb()
    if(rgb.test(color)) {
      color = rgb.exec(color);
      return {
        red: parseInt(color[1]),
        green: parseInt(color[2]),
        blue: parseInt(color[3]),
        opacity: 1
      }
    }
    
    // Tests if rgba()
    if(rgba.test(color)) {
      color = rgba.exec(color);
      return {
        red: parseInt(color[1]),
        green: parseInt(color[2]),
        blue: parseInt(color[3]),
        opacity: parseFloat(color[4])
      }
    }
  }

  function colorsToRgba(colors) {
    return "rgba(" + colors.red + ", " + colors.green + ", " + colors.blue + ", " + colors.opacity + ")";
  }
  
  // Applies variable to the formula
  function applyMath(formula, variable) {

    // Remove unnecessary signs
    formula = formula.replace(/(?![0-9\-xe\ \(\)\^\*\+\.]+).*/i, "");
    // Add * between number and x
    formula = formula.replace(/(\d+)x/ig, "$1*x");

    /**
    * @TODO IMPLEMENT POW()
    */

    // Add pow()
    //formula = formula.replace(/\(\w\-\+\^/ig);

    //if(formula !== "x") console.log(formula);

    // Replace x with variable
    formula = formula.replace(/x/gi, "variable");
    // run it
    return eval("(" + formula + ")");
  }

  /*
  * Changes value due to the formula and current position. Does the whole magic
  *
  * cOptions {
  *   formula,
  *   scrollObj,
  *   from,
  *   to
  * }
  *
  * Returns float
  */
  function change(cOptions) {
    var start = options.object.offsetTop;
    var end = start + options.object.offsetHeight;
    var factor = (window.scrollY - start + window.innerHeight) / (end-start);
    return cOptions.from + (applyMath(cOptions.formula, factor) * (cOptions.to - cOptions.from));
  }


  // Apply the changes to the obj
  function apply(event) {

    // Change red
    var red = change({
      formula: options.speed.red || "x",
      scrollObj: options.scrollObj,
      from: options.from.red,
      to: options.to.red
    });

    // Change green
    var green = change({
      formula: options.speed.green || "x",
      scrollObj: options.scrollObj,
      from: options.from.green,
      to: options.to.green
    });

    // Change blue
    var blue = change({
      formula: options.speed.blue || "x",
      scrollObj: options.scrollObj,
      from: options.from.blue,
      to: options.to.blue
    });

    // Change opacity
    var opacity = change({
      formula: options.speed.opacity || "x",
      scrollObj: options.scrollObj,
      from: options.from.opacity,
      to: options.to.opacity
    });

    // Apply changes
    options.object.style.backgroundColor = colorsToRgba({red, green, blue, opacity});
  }

  function constructor(options) {
    options.from = parseColors(options.from);
    options.to = parseColors(options.to);
    options.scrollObj = options.scrollObj || window;
    options.speed = options.speed || {};

    options.scrollObj.addEventListener("scroll", function(event) {
      apply();
    });


  }

  constructor(options);
}
