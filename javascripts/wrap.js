
    var createTag = function (options) {
        //log('createTag called');
        return options.openTag + options.selectedText + options.closeTag;
    };
    var createHashText = function (text) {
        if (text) {
            return text.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
        }
        return '';
    };

    var createLinkTag = function (options) {
        log('createLinkTag called');
        var hashText = createHashText(options.selectedText);
        var url = $.trim($(options.linkSelector).val());
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
        var openTag = '<a rel="nofollow" title="' + options.selectedText + '" name="' + hashText + '" href="' + url + '" >';
        var closeTag = '</a>';
        return openTag + options.selectedText + closeTag;
    };

    var createImageTag = function (options) {
        log('createImageTag called');
        var hashText = createHashText(options.selectedText);
        var url = $(options.linkSelector).val();
        if (url && url.trim().length > 0 && (validateUrl(url))) {
            //url is good
            url = url.trim();
        } else {
            error('Please provide a valid image url');
            return options.selectedText;
        }
        return '<img title="' + options.selectedText + '" alt="' + options.selectedText + '" src="' + url + '" style="clear:left; float:left;margin-right:2em; margin-bottom:1em;" />';
    };

    var createAmazonImageTag = function (options) {
        
        var hashText = createHashText(options.selectedText);
        var asin = $(options.linkSelector).val().trim().replace(/[_\s]/g, '');
        log('createAmazonImageTag called' + asin);
        if(asin) {
        var url = 'http://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=' + asin + '&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1' ;
        var hrefUrl = 'http://www.amazon.com/dp/' + asin + '?tag=' + $(options.tagSelector).val();
        if (url && url.trim().length > 0 && (validateUrl(url))) {
            //url is good
            url = url.trim();
        } else {
            error('Please provide a valid ASIN #');
            return options.selectedText;
        }
        
        var openTag = '<a rel="nofollow" title="' + options.selectedText + '" name="' + hashText + '" href="' + hrefUrl + '" >';
        var closeTag = '</a>';
        var h2WithAnchorTag = '<h2>' + openTag + options.selectedText + closeTag + '</h2>';
        var imageTag = '<img title="' + options.selectedText + '" alt="' + options.selectedText + '" src="' + url + '" style="clear:left; float:left;margin-right:2em; margin-bottom:1em;" />';
        return h2WithAnchorTag + openTag + imageTag + closeTag;
        } else {
        return;
        }
    };
    var appendTag = function (options) {
        log('appendTag called');
        return options.selectedText + ' ' + options.appendTagText;
    };
    
   var isNumber = function(n) {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	};

    var wrap = function (options) {
        log('');
        var textArea = $(options.elementSelector);
        var len = textArea.val().length;
        var start = textArea[0].selectionStart;
        var end = textArea[0].selectionEnd;
        if(options.useAllText) {
        	start = 0;
        	end = len;
        }
        var selectedText = textArea.val().substring(start, end).trim();
        if(options.decorator) {
        	selectedText = options.decorator(selectedText);
        }

        if (start !== end && selectedText.length > 0) {
            var replacement = selectedText;
            if (options.creator) {
                $.extend(options, {
                    selectedText: selectedText
                });
                replacement = options.creator(options);
            }
            textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
        } else {
            error('Please select some text');
        }
    };

   var wrapItem = function (options) {
        log('');
        var textArea = $(options.elementSelector);
        var len = textArea.val().length;
        var start = textArea[0].selectionStart;
        var end = textArea[0].selectionEnd;
        if(options.useAllText) {
        	start = 0;
        	end = len;
        }
        var selectedText = textArea.val().substring(start, end).trim();
        if(options.decorator) {
        	selectedText = options.decorator(selectedText);
        }

        if (start !== end && selectedText.length > 0) {
            var replacement = selectedText;
            if (options.creator) {
                $.extend(options, {
                    selectedText: selectedText
                });
                replacement = options.creator(options);
            }
            return replacement;
        } else {
            error('Please enter some text');
        }
        return '';
    };

    var originalText = $('#fulltext').val();
    var error = function (msg) {
        $('#log').text(msg).css('color', 'red');
        if(console.log) {
        	console.log(msg);
        }
    };
    var log = function (msg) {
        if (console.log) {
            console.log(msg);
        }
        $('#log').text(msg).css('color', 'black');
    };

    var validateUrl = function (url) {
        if (url) {
            if (/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
                return true;
            }
        }
        return false;
    };
    
    var extractUrls = function (options) {
    var urls = [];
    var count = 0;
    if (options) {
    	options.string = options.string.replace(/http/g, ' http');
    	options.words = options.string.split(' ');
        if (options.words.length > 0) {
             $('#log').text('extractUrls called' + options.words.length);
            for (var i=0; i < options.words.length; i++) {
                if (validateUrl(options.words[i].trim())) {
                	
                    urls[count] = options.words[i].trim();
                    count++;
                }
            }
        }

    }
    return urls;
};

    var buildOptions = function(options) {
		if (options) {
			$(options.elementSelector).empty();
			var html = [];
			var len = options.data.length;
			html[html.length] = '';
			for ( var i = 0; i < len; i++) {
				html[html.length] = '<option value="' + options.data[i] + '">' + options.data[i] + '</option>';
			}
			$(options.elementSelector).append(html.join(''));
		}
	};
	var toTitleCase = function(str) {
	    return str.replace(/(?:^|\s)\w/g, function(match) {
        	return match.toUpperCase();
    	});
	};
	
	var findTitle = function(url) {$.ajax({
      url: "http://textance.herokuapp.com/title/" + url,
      complete: function(data) {
        alert(data.responseText);
      }
	});
};
	