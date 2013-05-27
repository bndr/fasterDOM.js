//Test template was taken from  Steven Levithan © 2007
$(function () {
    $(".start_test").on("click", function () {
        var val = $(this).attr("data-count");
        test(parseInt(val));
    });
    // Ugly globals. This test app is very quick and dirty.
    var code = tt("code"),
        output = tt("output"),
        log = tt("log"),
        logContainer = tt("logContainer"),
        buttonsContainer = tt("buttons"),
        tenElsStr = "<div class='class1'></div><div class='class1'></div><div class='class1'></div><div class='class1'></div><div class='class1'></div><div class='class1'></div><div class='class1'></div><div class='class1'></div><div class='class1'></div><div class='class1'></div>",
        testStr = "",
        took = [],
        testMsg = [
            'FasterDom.attr',
            'FasterDom.css',
            'FasterDom.html',
            'FasterDom.append(element)',
            'FasterDom.append(string)',
            'FasterDom.prepend(element)',
            'FasterDom.prepend(string)',
            'FasterDom.hide()',
            'FasterDom.show()',
            'Jquery.attr',
            'Jquery.css',
            'Jquery.html',
            'Jquery.append(element)',
            'Jquery.append(string)',
            'Jquery.prepend(element)',
            'Jquery.prepend(string)',
            'Jquery.hide()',
            "Jquery.show()"
        ];

    function test(multiplier) {
        buttonsContainer.className = "loading";
        testStr = multiply(tenElsStr, multiplier);
        code.value = testStr;
        log = replaceHtml(log, log.innerHTML + "<hr><b>" + (multiplier * 10) + " elements...</b><br>\n");
        logContainer.scrollTop = logContainer.scrollHeight; // Scroll to the bottom of the log

        // Start out with the test elements in place
        output = replaceHtml(output, testStr);

        // Run the first test. The runTest function will recursively call itself until all tests are complete.
        setTimeout(function () {
            runTest(0);
        }, 0);

    };

    function runTest(testNum) {

        /* Using nested, 0ms timeouts to allow the page to redraw after each test completes.
         There is probably element better way to do this, but whatever. */
        setTimeout(function () {
            konsole.time("test");
            switch (testNum) {
                //FasterDom attr
                case 0:
                    $$(".class1").attr("data-cass", "fasterdom");
                    break;
                //FasterDom css
                case 1:
                    $$(".class1").css({width: '10px'});
                    break;
                //FasterDom html
                case 2:
                    $$(".class1").html("faster dom html");
                    break;
                //FasterDom append Element
                case 3:
                    var doc = document.createElement('p');
                    $$(".class1").append(doc);
                    break;
                //FasterDom append String
                case 4:
                    $$(".class1").append("String append faster dom");
                    break;
                case 5:
                //FasterDom prepend Element
                    var doc = document.createElement('p');
                    $$(".class1").prepend(doc);
                    break;
                //FasterDom prepend String
                case 6:
                    $$(".class1").prepend("prepend string faster dom");
                    break;
                //FasterDom hide
                case 7:
                    $$(".class1").hide();
                    break;
                //FasterDom show
                case 8:
                    $$(".class1").show();
                    break;
                //jQuery attr
                case 9:
                    $(".class1").attr("id", "idset");
                    break;
                //Jquery css
                case 10:
                    $(".class1").css({width: '100px'});
                    break;
                // jQuery html
                case 11:
                    $(".class1").html("jquery html");
                    break;
                //jQuery append element
                case 12:
                    var doc = document.createElement('div');
                    $(".class1").append($(doc));
                    break;
                //jQuery append String
                case 13:
                    $(".class1").append("jquery append string");
                    break;
                //jQuery prepend element
                case 14:
                    var doc = document.createElement('div');
                    $(".class1").prepend($(doc));
                    break;
                case 15:
                    $(".class1").prepend("jquery prepend string");
                    break;
                //jQuery hide
                case 16:
                    $(".class1").hide();
                    break;
                //jQuery show
                case 17:
                    $(".class1").show();
                    break;
            }
            took[testNum] = konsole.timeEnd("test");

            var timeDiff = testNum > 8 ? (" (" + difference(took[testNum - 9], took[testNum]) + ")") : "",
                logMsg = testMsg[testNum] + ": <b>" + took[testNum] + "ms</b>" + timeDiff + "<br>\n";
            log = replaceHtml(log, log.innerHTML + logMsg + (testNum === (testMsg.length - 1) ? "<i>Done.</i>\n" : ""));
            logContainer.scrollTop = logContainer.scrollHeight; // Scroll to the bottom of the log

            if (testNum === (testMsg.length - 1)) {
                // Clear the loading message (this has to run from within the last setTimeout)
                buttonsContainer.className = "";
            } else {
                // Call this function recursively until the last test completes
                runTest(testNum + 1);
            }
        }, 0);
    }
    ;

    var konsole = {
        time: function (name) {
            konsole._timers[name] = new Date().getTime();
        },
        timeEnd: function (name) {
            var took = new Date().getTime() - konsole._timers[name];
            konsole._timers[name] = null;
            return took;
        },
        _timers: {}
    };

    function difference(first, second) {
        if (Math.abs(first - second) < 5) {
            return "~ same speed";
        } else if (first === 0) {
            return "slower";
        } else if (second === 0) {
            return "faster";
        } else {
            var firstIsSlower = first > second;
            var numerator = firstIsSlower ? first : second;
            var denominator = firstIsSlower ? second : first;
            var diff = numerator / denominator;
            return diff.toFixed(1) + "x " + (firstIsSlower ? "faster" : "slower");
        }
    };


    function tt(el) {
        if (typeof el === "string")
            return document.getElementById(el);
        if (el.nodeName)
            return el;
        return false;
    };

    function multiply(str, num) {
        return Array(num + 1).join(str);
    }
    ;
    function replaceHtml(el, html) {
        var oldEl = typeof el === "string" ? document.getElementById(el) : el;
        var newEl = oldEl.cloneNode(false);
        newEl.innerHTML = html;
        oldEl.parentNode.replaceChild(newEl, oldEl);
        return newEl;
    };
    logContainer.style.height = Math.max(document.documentElement.clientHeight - 280, 100) + "px";
});
