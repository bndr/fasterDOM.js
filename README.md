fasterDOM.js 0.1
============

Fast DOM manipulation with "jquery-like" syntax and ~1.8Kb code.

Operations that are supported: .css(), .attr(), .html(), .append(), .prepend(), .show(), .hide() , .remove(), .get() (returns elements)

Selectors that are supported: By Id(#), by Class(.), by Name (@), by Tag(=)

The library is bound to $$, sou you can use it like this $$(".elements").html() or $$("#element").css();

Performance
===========
All the tests showed improvements to performance at least 30%.

Performance Tests can be found here: http://jsperf.com/testbndr

You can also run the tests on your own computer with test.html page.  (Or here: http://bndr.me/fasterdom/test.html)

Example
=======
```javascript
var elements = $$(".elements");
var single_element = $$("#element");
var some_other_element = $$("=div");

elements.append("Some string to append").prepend(document.createElement("div"))
        .css({width:"1px",height:"20px"}).attr("some-attr","some-value").html("some html string").hide().show();

single_element.html() // Returns html of the element
single_element.attr("some-attr"); // Returns attr from element
single_element.css() // Returns css of element
```
