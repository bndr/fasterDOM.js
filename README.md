fasterDOM.js 0.1
============

Fast DOM manipulation with "jquery-like" syntax and ~1.8Kb code.

Operations that are supported: .css(), .attr(), .html(), .append(), .prepend(), .show(), .hide() , .get() (returns elements)

Selectors that are supported: By Id or by Class.

Performance
===========
All the tests showed improvements to performance at least 30%.

Performance Tests can be found here: http://jsperf.com/testbndr

You can also run the tests on your own computer with test.html page.  (Or here: http://bndr.me/fasterdom/test.html)

Example
=======
```javascript
var elements = new FasterDom(".elements");

elements.append("Some string to append").prepend(document.createElement("div"))
        .css({width:"1px",height:"20px"}).attr("some-attr","some-value").html("some html string").hide().show();

elements.html() //Get html from element
elements.attr("some-attr"); //Get attr from element
```
