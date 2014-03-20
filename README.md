fragment.js
===
A convenient prototype for a fragment of DOM elements.

It should work with IE8, but then ES5 shims are required.

Synopsis
---
Define your application's `Fragment` extension(s), add a chainable `on` method :

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

Use on fragments your application creates:

```javascript
var options = fragment(
    '<option value="1">One</option>' +
    '<option value="2">Two</option>' +
    '<option value="3">Three</option>'
    ).on('click', function (evt) {
        alert(this.value)
    });
```

Or on fragments selected from the document, with `qsa`:

```javascript
qsa("button, input[type='button']").on(
    'click', function (evt) {
        this.disabled = true; 
    });
```

Or on fragments factored from a list of elements:

```javascript
var h1 = fragment.factory(document.getElementsByTag('h1'));
h1.on('click', function(evt) {
    alert(this.innerHTML);
});
```

And of course on a single element:

```javascript
var $ = fragment.$(),
    notifications = gebi('notifications');
function hide() {
    this.style.display = 'none'; 
}
$(notifications).on('click', hide);
```

Note that `fragment.js` defines `window.gebi` as a shorthand for `document.getElementById`.

Also, note how four distinct functions are used to create fragments from four distinct sources:

- **fragment.factory**: any list of DOM elements
- **fragment**: an HTML string
- **qsa**: a DOM selector
- **$**: a single DOM element

With a clean API - without function dispatch on argument type - `fragment.js` prevents all the subtle bugs possible with a confusing API and allows code analysis tools to do their job.

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
You may not need JQuery, Underscore or ES5 shims.

But you will need to manipulate DOM fragments with a minimum of conveniences. 

