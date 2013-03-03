function tidyText(text) {
	return $("<div/>").html(text).text().substring(0,20); // deencode html and truncate to max width
}

$(function(){

	var rows = 4;

	// Update the page when the app loads
	nowPlaying();
	
	// Listen for track changes and update the page
	player.observe(models.EVENT.CHANGE, function (event) {
		if (event.data.curtrack == true) {
			var track = player.track;
			var tracktext = tidyText(track.name) + "\n";
			if (track.album.artist.name != null) {
				$("#play-history").append('<div>Track changed to: '+track.name+' by '+track.album.artist.name+'</div>');
				tracktext += tidyText(track.album.artist.name) + "\n";
			} else {
				tracktext += tidyText(track.artists[0].name) + "\n";
				$("#play-history").append('<div>Track changed to: '+track.name+' by '+track.artists[0].name+'</div>');
			}
			if (rows == 4 && track.album) {
				tracktext += tidyText(track.album.name) + "\n" + track.album.year;
			}
			$.get("http://localhost:4567/lcd", { text: tracktext });
			
		}
		nowPlaying();
		
	}); 
	
	$("#commands a").click(function(e){
		switch($(this).attr('command')) {
			case "playTrackFromUri":
				// Grab a random track from your library (cause it's more fun)
				var tracks = library.tracks;
				var track = tracks[Math.floor(Math.random()*tracks.length)]
				clearPlaylist(tempPlaylist);
				tempPlaylist.add(track.data.uri);
				player.play(track.data.uri, tempPlaylist.data.uri, 0);
				e.preventDefault();
				break;
			case "playTrackFromContext":
				// Play an item (artist, album, playlist) from a particular position
				player.play(
					$(this).attr('href'),				// Item to play
					$(this).attr('href'),				// Context to use
					parseInt($(this).attr('pos'))		// Position to play from
				);
				e.preventDefault();
				break;
		}
	});
	
});

function clearPlaylist(playlist) {
	while (playlist.data.length > 0) {
		playlist.data.remove(0);
	}
}

function nowPlaying() {

	// This will be null if nothing is playing.
	var track = player.track;

	if (track == null) {
		$("#now-playing").html("Silence");
	} else {
		var link = null;
		if (player.context)
			link = new models.Link(player.context);
		else
			link = new models.Link(player.track.uri);
			
		if (link.type === models.Link.TYPE.ARTIST)
			playerImage.context = models.Artist.fromURI(link.uri);
		else if (link.type === models.Link.TYPE.PLAYLIST)
			playerImage.context = models.Playlist.fromURI(link.uri);
		else if (link.type === models.Link.TYPE.INTERNAL) {
			if (tempPlaylist.length > 0)
				playerImage.context = tempPlaylist;
		}
			
		$("#now-playing").empty();
		var cover = $(document.createElement('div')).attr('id', 'player-image');

		if (link.type === models.Link.TYPE.TRACK || link.type === models.Link.TYPE.LOCAL_TRACK ||
			(link.type === models.Link.TYPE.INTERNAL && tempPlaylist.length == 0)) {
			cover.append($(document.createElement('a')).attr('href', track.data.album.uri));
			var img = new ui.SPImage(track.data.album.cover ? track.data.album.cover : "sp://import/img/placeholders/300-album.png");
			cover.children().append(img.node);
		} else {
			cover.append($(playerImage.node));
		}
		
		$("#now-playing").append(cover);
		
		var song = '<a href="'+track.uri+'">'+track.name+'</a>';
		var album = '<a href="'+track.album.uri+'">'+track.album.name+'</a>';
		var artist = null;

		if (track.album.artist.name != null) {
			artist = '<a href="'+track.album.artist.uri+'">'+track.album.artist.name+'</a>';
		} else {
			artist = track.artists[0].name;
		}
		
		var context = player.context, extra ="";
		if(context) { extra = ' from <a href="'+context+'">here</a>'; } // too lazy to fetch the actual context name
		$("#now-playing").append(song+" by "+artist+" off "+album+extra);
	}
	
}