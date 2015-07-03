/*
 * jQuery Random Post Plugin
 * Author: Sachin Joshi sachin@fromdev.com
 * Copyright (c) 2013 www.FromDev.com
 * MIT Licensed: http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
	/*
	 * Turn this flag to true for debug logs.
	 */
	debug = false;
	settings = {};

	var methods = {
		load: function(options) {
        var api = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=' + encodeURIComponent(options.url) + "&num=" + "1000";
        $.getJSON(api, function (data) {

            // Check for error
            if (data.responseStatus == 200) {
                settings.currentFeed = data.responseData.feed;
                if(options.callback) {
                    options.callback(options);
                }
            } else {
                log('Error feed loading : ' + options.url);
                // Handle error if required
                var msg = '';
                if (options.showerror) {
                    if (options.errormsg !== '') {
                        msg = options.errormsg;
                    } else {
                        msg = data.responseDetails;
                    }
                }                
            }
        });
	}
	};
	
	$.randomPost = function(options) {
		if(options.redirect) {
			$.extend(options,{callback:redirectToRandomPage})
        	methods.load(options);
        } else if(options.targetElement) {
        	$.extend(options,{callback:showRandomPostUrls});
			methods.load(options);        
        }
	};

	var showRandomPostUrls = function(options) {
		$(options.targetElement).text('Loading..');
	};
	var redirectToRandomPage = function() {
		var itemCount = settings.currentFeed.entries.length;
        var r = getRandomInt(0, itemCount);
    	window.location.href = settings.currentFeed.entries[r].link;
	}

	var getRandomPostUrls = function() {
		var itemCount = settings.currentFeed.entries.length;
        var r = getRandomInt(0, itemCount);
    	window.location.href = settings.currentFeed.entries[r].link;
	}
    var getRandomIntArray = function (min, max, count) {

        var arr = []
        while (arr.length < count) {
            var randomnumber = getRandomInt(min, max);
            var found = false;
            if(arr.indexOf(randomnumber) > -1 ) {
                found = true;               
            }
            if (!found) arr[arr.length] = randomnumber;           
        }
         return arr;
    };
	var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var log = function (msg) {
        if (debug) {
            console.log(msg);       

        }
    };

})(jQuery);