/**
 * Faster DOM manipulation
 * The most basic operations, but much faster than jquery. (mostly)
 * @author Vadim Kr.
 * @copyright (c) 2013 bndr
 * @license http://creativecommons.org/licenses/by-sa/3.0/legalcode
 */

function FasterDom(element) {
    this.type = element.substr(0, 1);
    this.name = element.substr(1, element.length);
    this.element = (this.type === "#") ? document.getElementById(this.name) : Array.prototype.slice.call(document.getElementsByClassName(this.name));
}
FasterDom.prototype = {
    constructor: FasterDom,
    attr: function (name, value) {
        if (typeof value == "undefined") {
            return this.element.getAttribute(name);
        }
        if (!this.checkIf(this.element, "Array")) {
            this.set(this.element, name, value);
        } else {
            var i = this.element.length;
            while (i--) {
                this.set(this.element[i], name, value);
            }
        }
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
        if (typeof html == "undefined") {
            return this.element.innerHTML;
        }
        if (!this.checkIf(this.element, "Array")) {
            this.element.innerHTML = html;
        } else {
            var len = this.element.length;
            for (var i = 0; i < len; i++) {
                var el = this.element[i];
                var el2 = this.element[len - 1];
                el.innerHTML = html;
                el2.innerHTML = html;
                len--;
            }
        }
        return this;
    },
    css: function (obj) {
        if (typeof obj == "undefied") {
            return this.element.style;
        }
        if (!this.checkIf(this.element, "Array")) {
            for (var key in obj) {
                this.element.style[key] = obj[key];
            }
        } else {
            var len = this.element.length;
            while (len--) {
                for (var key in obj) {
                    this.element[len].style[key] = obj[key];
                }
            }
        }
        return this;
    },
    hide: function () {
        if (!this.checkIf(this.element, "Array")) {
            this.element.style.display = 'none';
        } else {
            var len = this.element.length;
            while (len--) {
                this.element[len].style.display = 'none';
            }
        }
        return this;
    },
    show: function () {
        if (!this.checkIf(this.element, "Array")) {
            this.element.style.display = 'block';
        } else {
            var len = this.element.length;
            while (len--) {
                this.element[len].style.display = 'block';
            }
        }
        return this;
    }, append: function (doc) {
        if (!this.checkIf(this.element, "Array")) {
            if (this.checkIf(doc, "String"))
                this.element.insertAdjacentHTML('beforeend', doc);
            else
                this.element.appendChild(doc.cloneNode(true));
        } else {
            var len = this.element.length;
            var type = this.checkIf(doc, "String");
            while (len--) {
                if (type) {
                    this.element[len].insertAdjacentHTML('beforeend', doc);
                } else {
                    this.element[len].appendChild(doc.cloneNode(true));
                }
            }
        }

    }, prepend: function (doc) {
        if (!this.checkIf(this.element, "Array")) {
            if (this.checkIf(doc, "String"))
                this.element.insertAdjacentHTML('afterbegin', doc);
            else
                this.element.insertBefore(doc.cloneNode(true),this.element.firstChild);
        } else {
            var len = this.element.length;
            var type = this.checkIf(doc, "String");
            while (len--) {
                if (type) {
                    this.element[len].insertAdjacentHTML('afterbegin', doc);
                } else {
                    this.element[len].insertBefore(doc.cloneNode(true),this.element[len].firstChild);
                }
            }
        }
    },
    get: function () {
        return this.element;
    },
    checkIf: function (obj, type) {
        return Object.prototype.toString.call(obj) == '[object ' + type + ']';
    }
}

