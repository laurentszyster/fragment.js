fragment.js
===
A convenient prototype for a fragment of DOM elements.

This module provides an extensible convenience similar to JQuery's `$` but without the confusion introduced by [jQuery.fn.init](https://github.com/jquery/jquery/blob/1.11.0-rc1/src/core/init.js)'s dispatch on argument type, value and arrity.

Note that `fragment.js` requires ES5 shims in IE8.

Synopsis
---
Add a chainable `on` method to `Fragment` prototype:

```javascript
fragment.extend({
	on: function(eventName, listener) {
	    if (this.addEventListener) {
	        this.addEventListener(eventName, listener);
	    } else { // IE8
	        this.attachEvent('on' + eventName, handler);
	    }
    }
});
```

Then use that convenience on instances of the `Fragment` prototype created with one of the four factories provided.

From an HTML source string, using `fragment`:

```javascript
var options = fragment(
    '<option value="1">One</option>' +
    '<option value="2">Two</option>' +
    '<option value="3">Three</option>'
    ).on('click', function (evt) {
        alert(this.value)
    });
```

Selected from the document by CSS selector, using `qsa`:

```javascript
qsa("button, input[type='button']").on(
    'click', function (evt) {
        this.disabled = true; 
    });
```

From a list of elements, using `fragment.factory`:

```javascript
var h1 = fragment.factory(document.getElementsByTag('h1'));
h1.on('click', function(evt) {
    alert(this.innerHTML);
});
```

From a single element, using a conveniently named static wrapper created with `fragment.$`:

```javascript
var $ = fragment.$(),
    notifications = gebi('notifications');
function hide() {
    this.style.display = 'none'; 
}
$(notifications).on('click', hide);
```

Note that `fragment.js` defines `window.gebi` as a shorthand for `document.getElementById`.

Besides its prototype extensions, `Fragment` provides two usefull methods: `filter` to filter elements without creating a new fragment; `qsa` to query all elements of a fragment by CSS selector and create a new fragment with the result.

For instance, to filter all text input of class `Number` whose value parsed as integer is positive, do:

```javascript
var positiveInputs = qsa('input[type="text"].Number')
    .filter(function (element) {
        parseInt(element.value) > 0;
    });
```

To create a new fragment for all `img` elements inside a given fragment `frag`, do:
```
var fragImages = frag.qsa('img');
```

Extensions
---
The basic conveniences defined in `fragment_commons.js` and bundled in `fragment-min.js` are the nine extensions most commonly required by web applications: 

```
on(eventName, listener)
fire(eventName)
hide()
show()
enable()
disable()
addClass(className, ...)
removeClass(className, ...)
toggleClass(className, force=undefined)
```

Use Case
---
You may not need JQuery.

But you will need to manipulate DOM fragments with a minimum of conveniences.

