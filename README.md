# SmoothColor
Simple VanillaJS lib to change color on scroll. Demo will be added soon.

## Implementation
Just downolad the script. Or you could just use ctrl-c + ctrl-v, if you would like of course

## Usage
1. Create the new instance of the SmoothColor 
```js
var sm = new SmoothColor(options) 
```

2. Replace options with an object
```js
var sm = new SmoothColor({
  object: DOMObject,
  from: color1,
  to: color2,
  speed: {
    red: "x",
    green: "x",
    blue: "x",
    opacity: "x"
  },
  limitSpeed: false
});
```

## Properties
**1. options.object**

Type: DOMElement ***(NOTE: Currently there is no option to use collection, array etc. of the DOMElements)***

Defines object in which color will be changed. 

**2. options.from**

Type: String

Defines color of the beginning of scrolling. Should be in the one of the following formats:

| Format | Example | 
| - | - |
| rgb() | rgb(10, 7,100) | 
| rgba() | rgba(10, 7,100, 0.7) |
| #rrggbb | #43ffda |
| #rgb | #fd3 |
| #rrggbbaa | #ff00fd87 |
| #rgba | #456a |

**3. options.to**

Type: String

Defines color of the end of scrolling. Should be in the one of the following formats:

| Format | Example | 
| - | - |
| rgb() | rgb(10, 7,100) | 
| rgba() | rgba(10, 7,100, 0.7) |
| #rrggbb | #43ffda |
| #rgb | #fd3 |
| #rrggbbaa | #ff00fd87 |
| #rgba | #456a |

**4. options.speed**

Type: Object

Defines formulas for the particular color/alpha layer. Each formula supports addition (+), substraction (-), dividion (/), multiplication (\*), curly brackets and multiplication of the coefficient with the factor ex. 4x. Currently there is no power sign (if you would like to write x^3, you had to use x\*x\*x)

Supported formulas for 
- options.speed.red
- options.speed.green
- options.speed.blue
- options.speed.opacity // alpha layer

**5. options.limitSpeed**

Type: Boolean

If true, *formula* (with applied *factor*) will always have value between 0 and 1

## How it works
It's very simple. On each scroll
1. It takes two colors
2. It gets theirs difference
3. It calculates the *factor* (height from the element's offset and current scroll position)
4. It applies the *factor* (as an x) to the previously purified *formula*
5. It applies the basic color + calculations from 4. and waits for the next "scroll" event

## Examples
```js
  var x = new SmoothColor({
    object: document.querySelector(".xD"),
    from: "#fff0",
    to: "#779bffdd",
    speed: {
      blue: "-5.551115e-16 + 2.093333*x - 2.48*x*x + 1.386667*x*x*x - 0.5",
      green: "x - 0.5",
      red: "x - 0.5"
    },
    limitSpeed: true
  });
```


```js
  var x = new SmoothColor({
    object: document.querySelector(".JP2GMDJustAJokeMan"),
    from: "#fff4",
    to: "#779bff",
    speed: {
      blue: "-5.551115e-16 + 2.093333*x - 2.48*x*x + 1.386667*x*x*x",
      green: "1.332268e-15 + 5.087879*x - 12.02727*x*x + 7.939394*x*x*x"
    }
  });
  ```

## Can I help you?
Of course! Just make some commits, send demos, QA etc. etc.

