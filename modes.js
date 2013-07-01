$(function() {
	var mode = /\.(\w+)$/g;
	$("h1, h2, h3, h4, h5, h6, h7, h8, h9").each(function() {
		var text = $(this).text();
		if (text.match(mode)) {
			var heading = $(this);
			heading.html(text.replace(mode, function(match, mode) {
				heading.next().addClass(mode + '-mode');
				return '<span class=mode>.' + mode + '</span>'
			}));
		}
	});
});
