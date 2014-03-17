function getClasses(className) {
	return className.replace(/^\s+|\s+$/g, '').split(/\s+/);
}
function addClass(className, names) {
	var classes = getClasses(className);
	for (var name in names) {
		if (classes.indexOf(name) == -1) {
			classes.push(name);
		}
	}
	return classes.join(' ');
}
function removeClass(className, names) {
	return getClasses(className).filter(function(name){
		return names.indexOf(name) > -1;
	}).join(' ');
}
function toggleClass(className, name, force) {
	if (force === undefined) {
		var classes = getClasses(className),
			index = classes.indexOf(name);
		if (index == -1) {
			classes.push(name); // Not found, add
		} else {
			classes[index] = ''; // Found, remove 
		}
		return classes.join(' ');
	} else if (force === true) {
		return addClass(className, [name]);
	} else {
		return removeClass(className, [name]);
	}
}
// on, fire, hide, show, enable, disable, addClass, removeClass, toggleClass.
window.fragment.extend({
	on: function (eventName, handler) {
		if (this.addEventListener) {
			this.addEventListener(eventName, handler, false);
		} else { // IE8
			this.attachEvent('on' + eventName, handler);
		}
	},
	fire: function (eventName) {
		if (document.createEvent) {
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent(eventName, true, false);
			this.dispatchEvent(evt);
		} else {
			this.fireEvent('on' + eventName);
		}		
	},
	hide: function () {
		this.style.display = 'none';
	},
	show: function () {
		this.style.display = '';
	},
	enable: function () {
		this.disabled = false;
	},
	disable: function () {
		this.disabled = true;
	},
	addClass: function () {
		if (this.classList) {
			this.classList.add.apply(this.classList, arguments);
		} else {
			this.className = addClass(this.className, arguments);
		}
	},
	removeClass: function () {
		if (this.classList) {
			this.classList.remove.apply(this.classList, arguments);
		} else {
			this.className = removeClass(this.className, arguments);
		}
	},
	toggleClass: function (name, force) {
		if (this.classList) {
			this.classList.toggle(name, force);
		} else {
			this.className = toggleClass(this.className, name, force);
		}
	}
});
