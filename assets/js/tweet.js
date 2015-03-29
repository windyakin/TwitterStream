(function($, io, window, undefined){

	var twitter, Twitter = function() {
		twitter = this;
		var tmpl = null;
		this.initalized();
	};
	Twitter.prototype = {
		initalized: function() {
			var track = window.location.hash || "ラブライブ";
			track = track.replace(/^#/, "");
			socketio.socket.emit('twitter', "search", track);
			this.tmpl = $('#tweetTemplate');
		},
		renderTweet: function(tweet) {
			// RTっぽいものは排除
			if ( tweet.text.indexOf("RT") === 0 ) return;
			// Menthionっぽいものも排除
			if ( tweet.text.indexOf("@") === 0 ) return;

			tweet.user.profile_image_url = tweet.user.profile_image_url.replace("_normal", "_bigger");

			var html = this.tmpl.render(tweet);
			$("#tweet").prepend(html);
		},
		initTweet: function(tweets) {
			$.each(tweets.statuses, $.proxy(function(index, tweet){
				this.renderTweet(tweet);
			},this));
		},
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
						case 'init':
							this.initTweet(args);
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
			twitter.renderTweet(tweet);
		},
		initTweet: function(tweets) {
			twitter.initTweet(tweets);
		}
	};

	$(document).ready(function(e){
		new SocketIO();
		new Twitter();
		window.twitter = twitter;
	});

}(jQuery, io, window, undefined));

