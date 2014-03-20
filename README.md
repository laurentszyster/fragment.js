fragment.js
===
A convenient prototype for a fragment of DOM elements.

Use Case
---
You may not need JQuery.

But you will need to manipulate DOM fragments with a minimum of conveniences.

Synopsis
---
Define your application's `Fragment` extensions, for instance add a chainable `on` method :

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

Then use that convenience on HTML fragments your application creates from source by `fragment`:

```javascript
var options = fragment(
    '<option value="1">One</option>' +
    '<option value="2">Two</option>' +
    '<option value="3">Three</option>'
    ).on('click', function (evt) {
        alert(this.value)
    });
```

Or on fragments selected from the document by `qsa`:

```javascript
qsa("button, input[type='button']").on(
    'click', function (evt) {
        this.disabled = true; 
    });
```

Or on fragments factored from a list of elements by the `fragment.factory`:

```javascript
var h1 = fragment.factory(document.getElementsByTag('h1'));
h1.on('click', function(evt) {
    alert(this.innerHTML);
});
```

And of course on a single element, using a conveniently named static wrapper created by `fragment.$`:

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

Without dispatch on arguments types and arrity (à la JQuery), the API of `fragment.js` avoids all the bugs made possible by such ambiguous interfaces.

Last but not least, this API is final, there will be no addition besides extensions of the `Fragment` prototype defined by its applications.

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
