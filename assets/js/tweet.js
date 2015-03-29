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

			this.removeTweetDom();
		},
		initTweet: function(tweets) {
			$.each(tweets.statuses, $.proxy(function(index, tweet){
				this.renderTweet(tweet);
			},this));
		},
		removeTweetDom: function() {
			var $tweets = $("#tweet > li");
			console.log($tweets.length);
			if ($tweets.length >= 30 ) {
				$($("#tweet > li")[$tweets.length-1]).remove();
			}
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

	var fullScreen, FullScreen = function() {
		fullScreen = this;
		this.initalized();
	};
	FullScreen.prototype = {
		initalized: function() {
			$(document)
				.on('click', '#fullscreen', $.proxy(this.enterFullScreen ,this));
		},
		enterFullScreen: function() {
			var elem = $(".fullscreen").get(0);
			if (elem.requestFullScreen) {
			  elem.requestFullScreen();
			} else if (elem.mozRequestFullScreen) {
			  elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullScreen) {
			  elem.webkitRequestFullScreen();
			}
		}
	};
	
	$(document).ready(function(e){
		new SocketIO();
		new Twitter();
		new FullScreen();
		window.twitter = twitter;
	});

}(jQuery, io, window, undefined));

