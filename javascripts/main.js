$.fn.onebyone = function() {
	this.each(function() {
		var $ele = $(this), str = $ele.html(), index = 0;
		$ele.html('');
		var timer = setInterval(function() {
			var current = str.substr(index, 1);
			if (current == '<') {
				index = str.indexOf('>', index) + 1;
			} else {
				index++;
			}
			$ele.html(str.substring(0, index) + (index && 1 ? '_' : ''));
			if (index >= str.length) {
				clearInterval(timer);
			}
		}, 75);
	});
	return this;
};
