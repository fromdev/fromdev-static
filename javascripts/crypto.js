$(window).load(function(){

if (jQuery.ui) {
	$('#dialog').dialog({
		autoOpen : false,
		width : 'auto',
		title : 'Enter Password'
	});
} else {
	log('jQuery UI not loaded yet');
}
  
    var selectors = { encryptedText: '#encryptedText', 
  			target: '#encryptedText',
  			password:'#password',
  			dialog:'#dialog',
  			message:'#message'
  		};
  		
    $("#showtext").focus(function () {
        var $this = $(this);
        $this.select();

        // Work around Chrome's little problem
        $this.mouseup(function () {
            // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
        });
    });
    $("#fulltext").focus(function () {
        var $this = $(this);
        $this.select();

        // Work around Chrome's little problem
        $this.mouseup(function () {
            // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
        });
    });
   
	$('#decrypt').click(function(){
		 $(selectors.dialog).dialog('open');
	});

	$('#passwordForm').submit(function() {
		return false;
	});
	$('#submit').click(function(){
		$(selectors.message).text('');
		 if(validatePassword()) {
		 	//var value = $(selectors.encryptedText).val();
		 	var value = $(selectors.encryptedText).attr('name');
		 	log('Trying decrypt'); 
		 	var plaintext = sjcl.decrypt($(selectors.password).val() ,value,{},{});
		 	$(selectors.target).html(plaintext);
		 	$(selectors.encryptedText).attr('name','');
		 	$(selectors.dialog).dialog('close');			
	    	log('Decrypted');
		 } else {
		 	$(selectors.message).text('Please provide a valid password').css('color', 'red');
		 }
	});
	
	
    var error = function (msg) {
        $('#log').text(msg).css('color', 'red');
    };
    var log = function (msg) {
        if (console.log) {
            console.log(msg);
        }
        $('#log').text(msg).css('color', 'black');
    };
	var validatePassword = function() {
		var value = '{"iv":"fAtPITLOyR5xiy7KmTA1TA==","v":1,"iter":1000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"OiwC5/fIlpA=","ct":"1nYEWPJf4QBFA+cvNDV50aT2kUw="}';
		try {
			return sjcl.decrypt($(selectors.password).val(), value, {}, {}) === $(selectors.password).val();
		} catch(e) {
			log('Invalid Password');
		} 
		return false;
	};

});