function substr(str, start, length) {
    return str.substring(start, length > 0 ? start + length : str.length + length);
}

$(document).ready(function() {


    $('.button-start, .button-stop').on('click', function() {
        if ($(this).hasClass('button-start')) {
            playtime = true;
            play_song();

            $(this).removeClass('button-start')
                .addClass('button-stop')
                .html('Stop');
        } else {
            playtime = false;
            single_track_player.playing = 0;

            $(this).removeClass('button-stop')
                .addClass('button-start')
                .html('Start');
        }
    });
});

var sp = getSpotifyApi(),
    models = sp.require('$api/models'),
    views = sp.require("$api/views"),
    single_track_player = new views.Player(),
    playlist_view = new models.Playlist(),
    previous_track_player = "",
    previous_track_name = "",
    list = new views.List(playlist_view),
    element = document.getElementById('playlist'),
    playtime = true;
    
    var previous_url_id;
    var previous_url_uid;
    var previous_track_uri;

    var previous_tracks = [ ];

    function play_song() {
        if (!playtime) {
            console.log("it's not playtime");
            return false;
        }
        var urls = [],
            urlcount = 0,
            url = '',
            members = '',
            i = 0,
            playlist_url = '';

        $.ajax({
            type: 'GET',
            url: 'http://www.movementminneapolis.com/widget-feed-1/',
            data: { 'widgetfeed' : 'spotify_playlists' },
            dataType: 'json',
            async: false,
            success: function(data) {
                urls = data;
            },
            error: function() {
                alert('Error loading spotify playlist url data' + id);
            }
        });

        urlcount = urls.length;

        for(var j=0; j < urlcount; j++) {
            var name = urls[j].name;
            members = members + name + ", ";
        }

        members = members.substr(0, members.length - 2);

        $('#users_playing').html(members);

        i = Math.floor(Math.random()*urlcount);

        if(urlcount > 1) {
            while(urls[i].uid == previous_url_uid) {
                console.log("re-randomizing to avoid duplicates url " + i);
                i = Math.floor(Math.random()*urlcount);
            }
        }

        url = urls[i];
        playlist_url_uid = url.uid;
        playlist_url = url.uri;

        $('#previous_track_name').html("<p>"+previous_track_name+"</p>");
        $('#previous_track_player').html("<p>"+previous_track_player+"</p>");
        $('#current_track_player').html("<p>"+url.name+"</p>");

        

            var pl = models.Playlist.fromURI(playlist_url, function(playlist) {
            var tracks = playlist.tracks.length;

           // console.log('previous tracks'+previous_tracks);

            if(urlcount > 1 && tracks > 1) {
                var t = Math.floor(Math.random()*tracks);
//                while(playlist.tracks[t].uri == previous_track_uri) {
                 while(inArray(playlist.tracks[t].uri,previous_tracks)) {
                    console.log("re-randomizing track to avoid duplicates " + i++);
                    t = Math.floor(Math.random()*tracks);
                }
            } else if(tracks > 1) {
                var t = Math.floor(Math.random()*tracks);
//                while(playlist.tracks[t].uri == previous_track_uri) {
//                console.log("in array"+inArray(playlist.tracks[t].uri,previous_tracks));
                 while(inArray(playlist.tracks[t].uri,previous_tracks)) {
                    console.log("re-randomizing track to avoid duplicates " + i++);
                    t = Math.floor(Math.random()*tracks);
                }
            } else {
                var t = Math.floor(Math.random()*tracks);
            }
            
            track = playlist.tracks[t];

            console.log("Loading: ", track);
            
            models.Track.fromURI(track.uri, function() {
                if (track.data.availableForPlayback == true) {
                    console.log("Loaded:", track);
                } else {
                    console.log("Failed to load:", track);
                    play_song();
                }
            });
            
            $('#current-track-name').html("<strong>" + track.name + "</strong>");

            playlist_view.add(track);

            var single_track_playlist = new models.Playlist();
            single_track_playlist.add(track);

            single_track_player.track = null; // Don't play the track right away
            single_track_player.context = single_track_playlist;

            var single_track_player_HTML = document.getElementById('single-track-player');
            single_track_player_HTML.appendChild(single_track_player.node);

            single_track_player.playing = 1;

            previous_track_player = url.name;
            previous_track_name = playlist.tracks[t].name;
            previous_track_id = t;
            previous_track_uri = track.uri;
            previous_tracks.push(track.uri);

            if(previous_tracks.length > 20) {
                console.log("shortening prev tracks");
                previous_tracks.pop();
            }
        });

        previous_url_id = i;
        previous_url_uid = playlist_url_uid;
    } // end function play_song()

while (element.firstChild) {
    element.removeChild(element.firstChild);
}

$('#playlist').append(list.node);

models.player.observe(models.EVENT.CHANGE, function(event) {
    console.log('something changed');
    console.log(event);
    if(event.data.playstate == true && event.data.contextclear == false && event.data.curtrack == true) {
        console.log('playstate true context clear false curtrack true');
        console.log('need to skip forward');
        //play_song();
    } else if(event.data.contextclear == true && event.data.curcontext == true && event.data.curtrack == true && event.data.playstate == true) {
        console.log('do nothing all true ');
    } else if(event.data.contextclear == false && event.data.curcontext == false && event.data.curtrack == false && event.data.playstate == false) {
        console.log('do nothing all false');
    } else if(event.data.contextclear == false && event.data.curcontext == false && event.data.curtrack == false && event.data.playstate == true) {
        console.log('do nothing all false except playstate');
    } else if(event.data.playstate == true && event.data.contextclear == false && event.data.curtrack == false) {
        // single_track_player.playing = false;
        console.log('all false except playstate');
    }
});

        var previous = document.getElementById('previous');

        var next = document.getElementById('next');


        previous.addEventListener('click', skipPrevious);
        next.addEventListener('click', skipNext);

        function skipPrevious(){
            return false;
        }

        function skipNext(){
            play_song();
        }
    
function ajax_response(REQ) {
    document.getElementById("ResponseDiv").innerHTML=REQ.responseText;
}

function playOrPause() {
    single_track_player.playing = !(single_track_player.playing);
    if (single_track_player.playing) {
        playerButton.value = 'Pause';
        } else {
        playerButton.value = 'Play';
        single_track_player.playing = false;
    }
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}
