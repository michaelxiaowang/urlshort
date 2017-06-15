$(function() {
	var socket = io.connect();
	var $urlForm = $('#urlform');
	var $urlBox = $('#urlbox');
	$urlForm.submit(function(e) {
		e.preventDefault();
		var url = $urlBox.val();
		if(url.startsWith('http://') || url.startsWith('https://')) {
			//get the part after the http:// or https://
			url = url.substring(url.indexOf('//') + 2);
		}
		socket.emit('long url', {oldUrl: url});
		$urlBox.val('');
	});
	socket.on('new url', function(data) {
		$('#newUrl').text(data.newUrl);
	});
});