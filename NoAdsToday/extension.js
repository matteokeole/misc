const
	delay = 500,
	scan = () => {
		const
			movie_player	= document.querySelector("#movie_player"),
			video			= document.querySelector(".video-stream.html5-main-video"),
			ad_countdown	= document.querySelector(".ytp-ad-message-container"),
			ad_overlay		= document.querySelector(".ytp-ad-overlay-container"),
			player_ads		= document.querySelector("#player-ads"),
			promoted_item	= document.querySelector("ytd-promoted-sparkles-web-renderer");

		// Skip start ad (not flawless)
		if (movie_player && video && /ad-(showing|interrupting)/.test(movie_player.className)) {
			video.currentTime = video.duration;
			document.querySelector(".ytp-ad-skip-button.ytp-button").click();
		}

		// Remove ad elements
		ad_countdown && ad_countdown.remove();
		ad_overlay && ad_overlay.remove();
		player_ads && player_ads.remove();
		promoted_item && promoted_item.remove();
	},
	css = setTimeout(() => {
		const
			video_title	= document.querySelector("h1.title.style-scope.ytd-video-primary-info-renderer yt-formatted-string"),
			font_link	= document.createElement("link");

		font_link.setAttribute("rel", "stylesheet");
		font_link.setAttribute("href", "https://fonts.gstatic.com/s/youtubesans/v8/Qw3hZQNGEDjaO2m6tqIqX5E-AVS5_rSejo46_PCTRspJ0OosolrBEJL3HMXfxQASluL2m_dANVawBpSD.woff2");

		document.head.appendChild(font_link);
		video_title.style.fontFamily = "Youtube Sans";
		video_title.style.fontWeight = 600;
		video_title.style.fontSize = "21px";
	}, 500),
	interval = setInterval(scan, delay);