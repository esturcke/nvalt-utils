$(function() {
	function getTag(node, tag, fallbackTag) {
		return fallbackTag
			? parseFloat($(node).tag(tag)) || parseFloat($(node).tag(fallbackTag)) || 0
			: parseFloat($(node).tag(tag)) || 0;
	}

	function sumTag(nodes, tag, fallbackTag) {
		return nodes.map(function() { getTag(this, tag, fallbackTag) }).reduce(function(sum, val) { sum + val }, 0);
	}

	function updateTaskData(li) {
		var estimate  = getTag(li, 'estimate');
		var actual    = getTag(li, 'actual');
		var remaining = getTag(li, 'remaining');
		$(li).find('> ul > li').each(function() {
			updateTaskData(this);
			estimate  += getTag(this, 'estimate');
			actual    += getTag(this, 'actual');
			remaining += getTag(this, 'remaining');
		});
		var progress  = $(li).tag('done') === "" ? 1 : getTag(li, 'progress')/100;
		if (remaining) {
			progress = actual / (actual + remaining);
		}
		else {
			remaining = progress == 0 ? estimate : actual / progress - actual;
		}
		if (estimate)  $(li).tag('estimate', estimate);
		if (actual)    $(li).tag('actual', actual);
		if (remaining) $(li).tag('remaining', remaining);
		if (progress)  $(li).tag('progress', Math.round(progress * 1000)/10  + '%');
	}

	$('ul.tasks-mode > li').each(function() {
		updateTaskData(this);
	});
});
