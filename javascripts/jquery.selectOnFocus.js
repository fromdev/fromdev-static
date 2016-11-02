/*
 * jQuery Focus Selector Plugin - Select the focused text.
 * Author: Sachin Joshi sachin@fromdev.com
 * Copyright (c) 2013 www.FromDev.com
 * MIT Licensed: http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
  /*
   * Turn this flag to true for debug logs.
   */
  var debug = false;

  $.fn.selectOnFocus = function() {
    var $this = $(this);
    $this.focus(function() {
      $this.select();

      // Work around Chrome's little problem
      $this.mouseup(function() {
        // Prevent further mouseup intervention
        $this.unbind("mouseup");
        return false;
      });
    });
  };

  var log = function(msg) {
    if (debug) {
      console.log(msg);

    }
  };

})(jQuery);
