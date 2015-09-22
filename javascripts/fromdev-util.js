	var error = function (msg) {
        $('#log').text(msg).css('color', 'red');
    };
    var log = function (msg) {
        if (console.log) {
            console.log(msg);
        }
        $('#log').text(msg).css('color', 'black');
    };
    var createHashText = function (text) {
        if (text) {
            return text.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
        }
        return '';
    };
    
    var validateUrl = function (url) {
        if (url) {
            if (/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
                return true;
            }
        }
        return false;
    };
    
    var createNoFollowLink = function(options) {
    	var url = options.url;
    	var hashText = options.hashText;
    	if (url && url.trim().length > 0) {
            if (validateUrl(url)) {
                //url is good
            } else {
                error('Please provide a valid url');
                return options.selectedText;
            }
        } else {
            url = '#' + hashText;
        }
        var relAttribute = "";
        if(options.nofollow) {
        	relAttribute = ' rel="nofollow" ';
        }
        var openTag = '<a ' + relAttribute + ' title="' + options.selectedText + '" name="' + hashText + '" href="' + url + '" >';
        if(options.selectedText.indexOf("http:") > -1 || options.selectedText.indexOf("https:") > -1) {
        	log('HTTP Found');
        	openTag = '<a rel="nofollow" href="' + url + '" >';
        } 
        var closeTag = '</a>';
        return openTag + options.selectedText + closeTag;
    };
    
    var createTag = function (options) {
        log('createTag called');
        return options.openTag + options.selectedText + options.closeTag;
    };
    
    var createAuthorBio = function(text) {
    	return createTag({
    		openTag: '<div class="related-index">',
    		selectedText: text,
        	closeTag: '</div>'
    	});
    };