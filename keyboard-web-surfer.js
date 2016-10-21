'use strict';

(function(window, document) {

	// Constants so the code makes a little more sense...
	var KEY_0 = 48,
	    KEY_1 = 49,
	    KEY_2 = 50,
	    KEY_3 = 51,
	    KEY_4 = 52,
	    KEY_5 = 53,
	    KEY_6 = 54,
	    KEY_7 = 55,
	    KEY_8 = 56,
	    KEY_9 = 57;


	/**
	 * Class to represent our grid.
	 *     - It wires up to the body's keypress event to do its magic
	 *     - Press `0` twice to open up the grid
	 *     - Press `1-9` to make the grid smaller
	 *     - Press `0` followed by `1-9` to CLICK in the center of that segment
	 */
	var Grid = function() {
		this._isVisible = false;
		this._zeroSelect = false;
		
		this._createElement();
		this._bindHandlers();
	};


	/**
	 * Private method to create the grid element
	 */
	Grid.prototype._createElement = function() {
		this._el = document.createElement('div');
		this._el.classList.add('keyboard-web-surfer-grid');

		// Create all of the segments and bind 'em up
		for (var n = 0; n < 9; ++n) {
			var gridSegment = document.createElement('div');
			gridSegment.textContent = n + 1;
			gridSegment.classList.add('keyboard-web-surfer-grid-segment');
			gridSegment.classList.add('keyboard-web-surfer-grid-segment-' + (n + 1));
			gridSegment.addEventListener('click', this._onSegmentSelect.bind(this, n + 1));

			this._el.appendChild(gridSegment);
		}

	};


	/**
	 * Shows the grid and resets all the state variables
	 * @return {undefined}
	 */
	Grid.prototype.show = function() {
		this._isVisible = true;
		this._zeroSelect = false;

		this._el.style.top = '0px';
		this._el.style.left = '0px';
		this._el.style.width = '100%';
		this._el.style.height = '100%';

		document.body.appendChild(this._el);
	};


	/**
	 * Hides the grid!
	 * @return {undefined}
	 */
	Grid.prototype.hide = function() {
		this._isVisible = false;
		this._zeroSelect = false;
		document.body.removeChild(this._el);
	};


	/**
	 * Helper method to bind up to the body's events
	 * @return {undefined}
	 */
	Grid.prototype._bindHandlers = function() {
		document.body.addEventListener('keypress', this._onBodyKeyPress.bind(this));
	};


	/**
	 * Fired when the user types anything on the page (probably want to limit this in case you're focused on a text box or something)
	 * @param  {Event} - The DOM Key Press event
	 * @return {undefined}
	 */
	Grid.prototype._onBodyKeyPress = function(e) {
		if (this._isVisible === false) {
			if (e.keyCode === KEY_0) {			
				if (this._zeroSelect === true) {
					this._zeroSelect = false;
					this.show();
				} else {
					this._zeroSelect = true;
				}
			}

			return;
		}

		switch(e.keyCode) {
			case KEY_0: 
				if (this._zeroSelect) {
					this.hide();
				} else {
					this._zeroSelect = true;
				}
			break;
			case KEY_1: this._onSegmentSelect(1); break;
			case KEY_2: this._onSegmentSelect(2); break;
			case KEY_3: this._onSegmentSelect(3); break;
			case KEY_4: this._onSegmentSelect(4); break;
			case KEY_5: this._onSegmentSelect(5); break;
			case KEY_6: this._onSegmentSelect(6); break;
			case KEY_7: this._onSegmentSelect(7); break;
			case KEY_8: this._onSegmentSelect(8); break;
			case KEY_9: this._onSegmentSelect(9); break;
		}
	};


	/**
	 * Fired when the user selects a segment. 
	 * If the zero key wasn't selected prior to this, it simply readjusts in size.
	 * If the zero key WAS selected prior to this, it clicks the center of the segment selected.
	 * @param  {Number} - The segment # that was clicked
	 * @return {undefined}
	 */
	Grid.prototype._onSegmentSelect = function(segmentNumber) {
		var segment = this._el.querySelector('.keyboard-web-surfer-grid-segment-' + segmentNumber);

		if (!this._zeroSelect) {
			// Readjust
			this._el.style.top = (this._el.offsetTop + segment.offsetTop) + 'px';
			this._el.style.left = (this._el.offsetLeft + segment.offsetLeft) + 'px';
			this._el.style.width = segment.clientWidth + 'px';
			this._el.style.height = segment.clientHeight + 'px';
		} else {
			// DO THE CLICKING
			var top = (this._el.offsetTop + segment.offsetTop) + segment.clientHeight / 2;
			var left = (this._el.offsetLeft + segment.offsetLeft) + segment.clientWidth / 2;
			
			this.hide();

			this._zeroSelect = false;

			simulateClick(left, top);
		}
	};

	/**
	 * Simulate a click event!
	 * @param  {Number} - x coordinate
	 * @param  {Number} - y coordinate
	 * @return {undefined}
	 */
	function simulateClick(x, y) {
		var clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
		document.elementFromPoint(x, y).dispatchEvent(clickEvent);
	}


	// Create instance of the Grid and drop it on the page
	window.keyboardGrid = new Grid();

})(window, document);
