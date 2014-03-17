fragment.js
===
A convenient prototype for a fragment of DOM elements.

It adds to the browser's `window` a `fragment` function to create fragments from HTML strings plus a `qsa` convenience to select fragments in the document.

Also included is an API to extend the `Fragment` prototype with chainable methods à la JQuery. And the most common conveniences required by any web applications are built-in: `on`, `fire`, `hide`, `show`, `enable`, `disable`, `addClass`, `removeClass` and `toggleClass`.

It should work with IE8 but ES5 shims are required.

Synopsis
---
Define your application's `Fragment` extension(s) :

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

Or on fragments selected from the document:

```javascript
qsa("button, input[type='button']").on(
    'click', function (evt) {
        alert(this.outerHTML); 
    });
```

The basic conveniences defined in `fragment_commons.js` are the nine most commonly required by web applications: 

```
on(eventName, listener)
fire(eventName)
hide()
show()
enable()
disable()
addClass(className)
removeClass(className)
toggleClass(className)
```

Also, note that `fragment.js` defines `window.gebi` as a shorthand for `document.getElementById` :

```javascript
window.gebi = document.getElementByInd.bind(document);
```

Because this:

```javascript
function hideAndDisable() {
    this.style.display = 'none';
    this.disabled = true;
}
hideAndDisable.apply(gebi('notifications'));
```

May quickly be more convenient than this:

```javascript
qsa('#notifications').hide().disable();
```

As it supports a more efficient convenience:

```javascript
fragment.extend({
    hideAndDisable: hideAndDisable;
});
```

Whenever there is the need to add a method to the `Fragment` prototype, it is best written as a function applied to a DOM element.

Use Case
---
You may not need JQuery, Underscore or ES5 shims.

But you will need to manipulate DOM fragments with a minimum of conveniences.