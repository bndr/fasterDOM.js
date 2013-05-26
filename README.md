fasterDOM.js 0.1
============

Basic operations like jquery but much faster.

Operations: .css(), .attr(), .html(), .append(), .prepend(), .show(), .hide() , .get() (returns elements)

Performance
===========
All the tests showed improvements to performance at least 30%.

Performance Tests can be found here: http://jsperf.com/testbndr

You can also run the tests on your own computer with test.html page.  (Or here: http://bndr.me/fasterdom/test.html)

Example
=======
```
var elements = new FasterDom(".elements");

elements.append("Some string to append").prepend(document.createElement("div"))
        .css({width:"1px",height:"20px"}).attr("some-attr","some-value").html("some html string").hide().show();

elements.html() //Get html from element
elements.attr("some-attr"); //Get attr from element
```
