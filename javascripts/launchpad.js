/*** Launchpad by @sklppr - https://github.com/sklppr/launchpad ***/

// Encapsulating all functionality.
var launchpad = {
	search: {
		form: undefined,
		field: undefined,
		url: undefined,
		select: function(selector) {
			this.url = $(selector).attr('data-search-url');
		},
		go: function() {
			window.location = this.url.split('{query}').join(escape(this.field.attr('value')));
		}
	}
};

// Initialization.
$(document).ready(function() {
	
	// Determine search form and field to work with.
	launchpad.search.form = $('#search-form');
	launchpad.search.field = $('#search-field');
	
	// Focus search field if browser doesn't support the HTML5 autofocus.
	if (!('autofocus' in document.createElement('input'))) {
		launchpad.search.field.focus();
	}
	
	// Disable static Google search, then dynamically select search method (default: Google).
	launchpad.search.form.removeClass('google').attr('action', '');
	if (!window.location.hash) {
		window.location.hash = '#search-google';
	}
	launchpad.search.select(window.location.hash);
	
	// Set up search method selection.
	$('.search-page').each(function(index, element) {
		var link = $(element);
		link.data('goto', link.attr('href'));
		link.attr('href', '#' + link.attr('id'));
		
		// Link selects search method when clicked.
		link.click(function(event) {
			launchpad.search.select('#' + event.currentTarget.id);
			window.location.hash = '#' + event.currentTarget.id;
			launchpad.search.field.focus();
			return false;
		});
		
		// Link goes to original URL when double clicked.
		link.dblclick(function(event) {
			window.location = link.data('goto');
			return false;
		});
	});
	
	// Catch the search form's submit action and perform selected search.
	launchpad.search.form.submit(function() {
		launchpad.search.go();
		return false;
	});
	
});