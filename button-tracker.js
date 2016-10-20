'use strict';

(function(window) {

	var buttonElementList = document.querySelectorAll('button');

	buttonElementList.forEach(function(button) {
		button.setAttribute('data-click-count', 0);
		button.textContent = 'Click Count: 0';

		button.addEventListener('click', onClick);
	});

	function onClick(e) {
		var button = e.target;
		var clickCount = parseInt(button.getAttribute('data-click-count'), 10) + 1;

		button.setAttribute('data-click-count', clickCount);
		button.textContent = 'Click Count: ' + clickCount;
	}

})(window);
