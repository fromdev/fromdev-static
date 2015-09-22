var links = new Array();
var addToLinks = function(arr) {
	for(var i in arr) {
		links.push({'url':arr[i],'text':arr[i].substring(0,arr[i].indexOf('.'))});
	}
};
$(window).load(function(){
	var cList = $('ul.index')
	$.each(links, function(i)
{
    var li = $('<li/>')
        .addClass('ui-menu-item')
        .attr('role', 'menuitem')
        .appendTo(cList);
    var aaa = $('<a/>')
        .addClass('ui-all')
        .text(links[i].text)
        .attr('href',links[i].url)
        .appendTo(li);
});
	
});