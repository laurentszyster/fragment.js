/* fragment.js */
var slice = Array.prototype.slice;
/**
 * A prototype for DOM fragments.
 */
function Fragment (elements) {
	this.elements = elements;
}
/**
 * Get the first element of the fragment
 */
Fragment.prototype.element = function () {
	return this.elements[0];
}
/**
 * Filter the elements of the fragment, chainable.
 */
Fragment.prototype.filter = function (filter) {
	this.elements = this.elements.filter(filter);
	return this;
}
/**
 * The first `Fragment` factory.
 *
 * Apply a CSS selector to each of the fragment's elements and
 * return a new fragments with the concatenated results.
 */
Fragment.prototype.qsa = function (selector) {
	return new Fragment(this.elements.map(function (element) {
		return slice.apply(element.querySelectorAll(selector));
	}).reduce(function(a, b){
		return a.concat(b);
	}));
}
/**
 * The second `Fragment` factory.
 *
 * A convenience to get a fragments from an HTML string.
 */
window.fragment = function () {
	var fragmentRE = /^\s*<(\w+)[^>]*>/,
		table = document.createElement('table'),
		tableRow = document.createElement('tr'),
		containers = {
		    'tr': document.createElement('tbody'),
		    'tbody': table, 'thead': table, 'tfoot': table,
		    'td': tableRow, 'th': tableRow,
		    '*': document.createElement('div')
			}
	return function fragment_html (html, name) {
		if (name === undefined) {
			name = fragmentRE.test(html) && RegExp.$1;
		}
		if (!(name in containers)) { 
			name = '*';
		}
		var container = containers[name];
		container.innerHTML = html;
		return new Fragment(slice.apply(container.childNodes));
	};
}();
/**
 * Extend the `Fragment` prototype with chainable `methods` that
 * are applied for each of the fragment `elements`.
 *
 * Throw an exception if a method is already defined.
 */
window.fragment.extend = function (methods) {
	var proto = Fragment.prototype; 
	Object.keys(methods).forEach(function (name) {
		if (proto[name] !== undefined) {
			throw "Method already defined: Fragment." + name;
		}
		var method = methods[name];
		proto[name] = function () {
			var a = arguments;
			this.elements.forEach(function (e) {
				method.apply(e, a);
			})
			return this;
		}
	});
};
/**
 * Get the keys of the `Fragment.prototype`, ie: its extensions names.
 */
window.fragment.extensions = function () {
	return Object.keys(Fragment.prototype);
};
/**
 * The other Fragment factory ;-)
 */
window.qsa = function (selector, root) {
	return new Fragment(slice.apply(
		(root === undefined ? document : root).querySelectorAll(selector)
		));
};

// Something completely different, just a shortcut
window.gebi = document.getElementById.bind(document);