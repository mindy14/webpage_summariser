
bkg = chrome.extension.getBackgroundPage();


var _gaq = _gaq || [];
_gaq.push(['_setAccount', bkg.AnalyticsHelper.gaAccount]);
_gaq.push(['_trackPageview']);
bkg.AnalyticsHelper.gaLoad(document);

jQuery(document).ready(function($){

	var email = (function(){
		coded = "49vVNJ@y36Ws4sWA.4VN"
		key = "bP3Oc7k8xzM2dnm0oWZplqEw4SKf1UDBr6NeVCTAshItiLYyjQu5vXHJFRGag9"
		shift = coded.length
		output = ""
		for (i = 0; i < coded.length; i++) {
			if (key.indexOf(coded.charAt(i)) == -1) {
				ltr = coded.charAt(i)
				output += (ltr)
			} else {
				ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length
				output += (key.charAt(ltr))
			}
		}
		return output;
	})();
	$('#contact-link').attr('href', 'mailto:'+email).find('span').html(email);
	

	$('#cpau_version_label').html(chrome.runtime.getManifest().version);


	OptionFormManager.init();
	

	$('#formats input[type=radio]').change(function(e){
		localStorage["format"] = $(this).val();
		OptionFormManager.init();
	});
	

	$('#format_html_advanced input[type=radio]').change(function(e){
		localStorage["anchor"] = $(this).val();
		OptionFormManager.init();
	});
	

	$('#format_custom_advanced>textarea').change(function(e){
		localStorage["format_custom_advanced"] = $(this).val();
		OptionFormManager.init();
	});
	

	$('#intelligent_paste').change(function(e){
		localStorage["intelligent_paste"] = $(this).prop("checked");
		OptionFormManager.init();
	});
	

	$('#walk_all_windows').change(function(e){
		localStorage["walk_all_windows"] = $(this).prop("checked");
		OptionFormManager.init();
	});
	

	$('#highlighted_tab_only').change(function(e){
		localStorage["highlighted_tab_only"] = $(this).prop("checked");
		OptionFormManager.init();
	});
	

	$('#default_action').change(function(e){
		localStorage["default_action"] = $(this).val();
		OptionFormManager.init();
	});
	

	$('#mime').change(function(e){
		localStorage["mime"] = $(this).val();
		OptionFormManager.init();
	});
	

	$('#reset_settings').click(function(e){
		_gaq.push(['_trackEvent', 'Internal link', 'Reset settings']);
		OptionFormManager.optionsReset();
	});
	

	var currentYear = new Date().getFullYear();
	if( $('#copyright-year-footer').text() < currentYear ){
		$('#copyright-year-footer').text(currentYear);
	}
	

	$('.open-link-via-chrome-api').click(function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		var href = $(this).attr('href');
		if (href == undefined) {
			return;
		}
		var gaAction = $(this).data('galinkid') || $(this).attr('id') || $(this).text() || 'Unset';
		_gaq.push(['_trackEvent', 'Internal link', gaAction, href]);
		if ($(this).hasClass('on-new-tab')) {
			chrome.tabs.create({url: href});
		} else {
			chrome.tabs.update({url: href});
		}
	});
	

	if (bkg.UpdateManager.recentUpdate()) {
		var content = "<h3>New version recently installed : " + chrome.runtime.getManifest().version + "</h3>"
			+ "Check the " + '<a href="http://finalclap.github.io/CopyAllUrl_Chrome/" data-galinkid="changelog recent update">' + "changelog</a> to see what's new !<br>"
			+ "<em>This notice will go off automatically</em>";
		$('#recently-updated').html(content).show();
	}
	

	$('.hero-unit .paypal-donate form').click(function(e){
		e.stopImmediatePropagation();
		_gaq.push(['_trackEvent', 'Donate', 'Paypal', 'Header']);
	});
	$('#donate-paypal form').click(function(e){
		e.stopImmediatePropagation();
		_gaq.push(['_trackEvent', 'Donate', 'Paypal', 'About']);
	});
	$('#donate-flattr a').click(function(e){
		e.stopImmediatePropagation();
		_gaq.push(['_trackEvent', 'Donate', 'Flattr', 'About']);
	});
	$('#donate-bitcoin img').click(function(e){
		e.stopImmediatePropagation();
		_gaq.push(['_trackEvent', 'Donate', 'Bitcoin', 'About']);
	});
	$('#contact-link').click(function(e){
		e.stopImmediatePropagation();
		_gaq.push(['_trackEvent', 'Internal link', 'Email']);
	});
	$('a').click(function(e){
		var href = $(this).attr('href');
		try {
			if (!href.match(/^\s*http/i)) {
				return;
			}
		} catch(ex) {
			return;
		}
		e.stopImmediatePropagation();
		var gaAction = $(this).data('galinkid') || $(this).attr('id') || $(this).text() || 'Unset';
		_gaq.push(['_trackEvent', 'External link', gaAction, href]);
	});
});


var OptionFormManager = {

	init: function(){
		var format = localStorage['format'] ? localStorage['format'] : 'text';
		var anchor = localStorage['anchor'] ? localStorage['anchor'] : 'url';
		var format_custom_advanced = localStorage['format_custom_advanced'] ? localStorage['format_custom_advanced'] : '';
		var intelligent_paste = localStorage['intelligent_paste'] == "true" ? true : false;
		var walk_all_windows = localStorage['walk_all_windows'] == "true" ? true : false;
		var highlighted_tab_only = localStorage['highlighted_tab_only'] == "true" ? true : false;
		var default_action = localStorage['default_action'] ? localStorage['default_action'] : "menu";
		var mime = localStorage['mime'] ? localStorage['mime'] : 'plaintext';
		

		this.cocherFormat(format);
		

		jQuery('#format_html_advanced input[type=radio]').attr('checked', false);
		jQuery('#format_html_anchor_' + anchor).attr('checked', true);
		

		jQuery('#format_custom_advanced>textarea').val(format_custom_advanced);
		

		$('#format_html_advanced').hide();
		$('#format_custom_advanced').hide();
		if( format == 'html' ){
			$('#format_html_advanced').show();
		}
		if( format == 'custom' ){
			$('#format_custom_advanced').show();
		}
		

		jQuery('#intelligent_paste').prop('checked', intelligent_paste);
		

		jQuery('#walk_all_windows').prop('checked', walk_all_windows);
		

		jQuery('#highlighted_tab_only').prop('checked', highlighted_tab_only);
		

		jQuery('#default_action').val(default_action);
		

		jQuery('#mime').val(mime);
	},
	

	cocherFormat: function(option){
		jQuery('#formats input[type=radio]').attr('checked', false);
		jQuery('#format_' + option).attr('checked', true);
	},


	optionsReset: function(){
		delete(localStorage["format"]);
		delete(localStorage["anchor"]);
		delete(localStorage["format_custom_advanced"]);
		delete(localStorage["intelligent_paste"]);
		delete(localStorage["walk_all_windows"]);
		delete(localStorage["highlighted_tab_only"]);
		delete(localStorage["default_action"]);
		delete(localStorage["mime"]);
		this.init();
	}
};
