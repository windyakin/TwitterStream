(function($, io, window, undefined){

	var twitter, Twitter = function() {
		twitter = this;
		this.initalized();
	};
	Twitter.prototype = {
		initalized: function() {
			socketio.socket.emit('twitter', "search", "ラブライブ");
		},
		hitTweet: function(tweet) {
			// RTっぽいものは排除
			if ( tweet.text.indexOf("RT") === 0 ) return;
			// Menthionっぽいものも排除
			if ( tweet.text.indexOf("@") === 0 ) return;
			console.log(tweet);
			var html = $('#tweetTemplate').render(tweet);
			$("#tweet").prepend(html);
		}
	}

	var socketio, SocketIO = function() {
		socketio = this;
		this.socket = io();
		this.initalized();
	};
	SocketIO.prototype = {
		initalized: function() {
			this.socket
				.on('twitter', $.proxy(function(command, args) {
					switch( command ) {
						case 'search':
							this.searchTwitter(args);
							break;
						case 'hit':
							this.hitTweet(args);
							break;
						default:
							console.log(command + ' is not found.');
							break;
					}
				}, this));
		},
		searchTwitter: function(word) {
			$("#word").text(word);
		},
		hitTweet: function(tweet) {
			twitter.hitTweet(tweet);
		}
	};

	$(document).ready(function(e){
		new SocketIO();
		new Twitter();
		window.twitter = twitter;
	});

}(jQuery, io, window, undefined));

