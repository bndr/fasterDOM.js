/**
 * Faster DOM manipulation
 * The most basic operations, but much faster than jquery. (mostly)
 * @author Vadim Kr.
 */
(function () {
    function FasterDom(s) {
        var z = 'getElement', g = 'Name', a = {'#': 'ById', '.': 'sByClass' + g, '@': 'sBy' + g, '=': 'sByTag' + g}[s[0]] || false,
            b = s.slice(1), u = (a ? document[z + a](b) : document.querySelectorAll(b));
        this.element = (this.checkIf(u, "NodeList")) ? Array.prototype.slice.call(u) : u;
    }

    FasterDom.prototype = {
        constructor: FasterDom,
        attr: function (name, value) {
            if (this.checkIf(name, 'String') && typeof value === "undefined") {
                return this.element.getAttribute(name);
            }
            var that = this;
            this.each(function (element) {
                that.set(element, name, value);
            });
            return this;
        }, set: function (element, name, value) {
            if (this.checkIf(name, "String")) {
                element.setAttribute(name, value);
            } else if (this.checkIf(name, "Object")) {
                for (var property in name) {
                    element.setAttribute(property, name[property]);
                }
            }
        },
        html: function (html) {
            if (typeof html === "undefined") {
                return this.element.innerHTML;
            }
            this.each(function (element) {
                element.innerHTML = html;
            });
            return this;
        },
        css: function (obj) {
            if (typeof obj === "undefined") {
                return this.element.style;
            }
            this.each(function (element) {
                for (var key in obj) {
                    element.style[key] = obj[key];
                }
            });
            return this;
        },
        hide: function () {
            this.each(function (element) {
                element.style.display = 'none';
            });
            return this;
        },
        show: function () {
            this.each(function (element) {
                element.style.display = 'block';
            });
            return this;
        },
        append: function (doc) {
            var type = this.checkIf(doc, "String");
            if (type) {
                this.each(function (element) {
                    element.insertAdjacentHTML('beforeend', doc);
                });
            } else {
                this.each(function (element) {
                    element.appendChild(doc.cloneNode(true));
                });
            }
            return this;

        },
        prepend: function (doc) {
            var type = this.checkIf(doc, "String");
            if (type) {
                this.each(function (element) {
                    element.insertAdjacentHTML('afterbegin', doc);
                });
            } else {
                this.each(function (element) {
                    element.insertBefore(doc.cloneNode(true), element.firstChild);
                });
            }
            return this;

        },
        remove: function () {
            this.each(function (element) {
                element.parentNode && element.parentNode.removeChild(element);
            });
            return this;
        },
        parent: function () {
            return (!this.checkIf(this.element, "Array")) ? this.element.parentNode : null;
        },
        get: function () {
            return this.element;
        },
        each: function (fun) {
            if (!Array.prototype.forEach) {
                Array.prototype.forEach = function (fn, scope) {
                    for (var i = 0, len = this.length; i < len; ++i) {
                        fn.call(scope, this[i], i, this);
                    }
                }
            }
            if (this.checkIf(this.element, "Array")) {
                this.element.forEach(fun,this);
            } else {
                fun(this.element);
            }
        },
        checkIf: function (obj, type) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    }
    window.$$ = function (a) {
        return new FasterDom(a);
    };

})();
