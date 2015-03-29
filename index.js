var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('twitter');
var twitter = new Twitter(require('./twitter.json'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
	res.sendfile('index.html');
});

io.on('connection', function(socket){
	// Twitter検索部分
	socket
		// Twitter検索
		.on('twitter', function(command, word) {
			switch( command ) {
				case 'search':
					var track = word || "#kosencof";
					// 既に検索していた場合はその検索をやめる
					if ( typeof twitter.currentTwitStream !== 'undefined' ) {
						twitter.currentTwitStream.destroy();
					}
					// 検索を行う
					twitter.get('search/tweets', {q: track}, function(error, tweets, response){
					   console.log(tweets);
					   io.emit('twitter', 'init', tweets)
					});
					// ストリーミングAPIからリアルタイム取得
					twitter.stream('statuses/filter', {track: track}, function(stream) {
						// Streamで流れてきたのをemit
						stream.on('data', function (tweet) {
							console.log(tweet.text);
							io.emit('twitter', 'hit', tweet);
						});
						stream.on('error', function(error) {
							throw error;
						});
						twitter.currentTwitStream = stream;
					});
					io.emit('twitter', 'search', track);
					break;
				case 'stop':
					if ( typeof twitter.currentTwitStream !== 'undefined' ) {
						twitter.currentTwitStream.destroy();
					}
					break;
				default:
					console.log(command + 'is not found.');
					break;
			}
		});

	socket.on('disconnect', function(){
		if ( typeof twitter.currentTwitStream !== 'undefined' ) {
			twitter.currentTwitStream.destroy();
		}
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});