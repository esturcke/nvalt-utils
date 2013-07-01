(function($) {
    $.fn.changeElementType = function(newType) {
        var attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    };

	function init() {
		github_code_blocks();
		hljs.initHighlightingOnLoad();
	}

	function github_code_blocks() {
		$("p > code").each(function() {
			var split = $(this).text().split("\n");
			if (split.length > 1) {
				$(this).addClass(split.shift());
				$(this).text(split.join("\n"));
				$(this).parent().changeElementType('pre');
			}
		});
	}

	$(init);
})(jQuery);
