$(function() {
	var tag = /@(\w+)(?:\((.*?)\))?/g;

	function makeTag(name, value) {
	return value === undefined || value === ''
		? '<span class=tag data-' + name + '><span class=name>' + name + '</span></span>'
		: '<span class=tag data-' + name + '="' + value + '"><span class=name>' + name + '</span><span class=value>' + value + '</span></span>';
	}

	$("*").each(function() {
		var element = $(this);
		var textNodes = element.contents().filter(function() { return this.nodeType == 3 });
		textNodes.each(function() {
			var text = $(this).text();
			if (text.match(tag)) {
				$(this).replaceWith(text.replace(tag, function(match, name, value) {
					element.attr('data-' + name, value === undefined ? '' : value);
					return makeTag(name, value);
				}));
			}
		});
	});


	// plugin to get tag values or add a tag
	// $(el).tag('foo') => tag value
	// $(el).tag('foo', val) => set the tag
	$.fn.tag = function(name, value) {
		if (value === undefined) {
			return this.attr('data-' + name);
		}
		else {
			return this.each(function() {
				$(this).attr('data-' + name, value);
				$(this).children('span.tag[data-' + name + ']:first').remove();
				$(this).contents().filter(function() { return this.nodeType == 3 }).first().after(makeTag(name, value));
			});
		}
	};

	$.fn.removeTag = function(tag) {
		return this.each(function() {
			$(this).children('span.tag[data-' + tag + ']:first').remove();
			$(this).removeAttr('data-' + tag);
		});
	};
});
