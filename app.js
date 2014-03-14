// Require ftp package
var ftpServer = require('ftp-server');

// Override the STOR command handler
function receiveFile (file) {
	var socket = this;
	socket.dataTransfer(function (dataSocket, finish) {
		socket.fs.writeFile(file, function (stream) {
			dataSocket.pipe(stream);
		});
	});
;}

ftpServer.commands["STOR"] = receiveFile;
console.log(ftpServer);

ftpServer.listen(8000);