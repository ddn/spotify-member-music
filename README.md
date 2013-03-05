# Spotify Member Music
![Spotify Apps Tutorial home screen](http://www.dellanave.com/skitch//Spotify-20130301-205346.png)

This Spotify App pulls a list of playlists via a REST request, then randomly cycles through them playing a song from each.

## Installation

 1. Sign up for a [developer account on Spotify](http://developer.spotify.com/en/spotify-apps-api/developer-signup/)
 2. Open Terminal, `mkdir ~/Spotify`
 3. `cd ~/Spotify`
 4. `git clone git://github.com/ddn/spotify-member-music.git`
 6. Download the [latest version of Spotify](http://spotify.com/download)
 7. Open Spotify and type "spotify:app:member-music" in the search bar (restart Spotify completely in case it doesn't find the App at first)

## More information

 * [API Reference](https://developer.spotify.com/technologies/apps/docs/)
 * [Integration Guidelines](http://developer.spotify.com/download/spotify-apps-api/guidelines/)
 * [Spotify-tagged questions on StackOverflow](http://stackoverflow.com/questions/tagged/spotify)
 * [@SpotifyPlatform](https://twitter.com/#!/SpotifyPlatform) on Twitter

Your REST API should return a JSON encoded array of a name and a URL such as:

[{"uri":"http:\/\/open.spotify.com\/user\/ddn3d\/playlist\/4dnoJs5ZZgDK9B21pAJhpg","name":"David Dellanave"}]
