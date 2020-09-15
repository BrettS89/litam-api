const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const spotify = require('../../utils/spotify');

module.exports = async (req, res) => {
  try {
    await userAuth(req.header('authorization'));
    const { term } = req.params;
    let songs = [];
    if (term !== 'undefined') {
      songs = await spotify.searchSongs(term);
      songs = songs.map(t => {
        return {
          song: t.name,
          artist: spotify.formatArtists(t.artists),
          albumArt: t.album.images[2].url,
          audio: t.preview_url,
          id: t.id,
        }
      })
    } else {
      songs = await spotify.getPlaylist();
      songs = songs.map(t => {
        return {
          song: t.track.name,
          artist: spotify.formatArtists(t.track.artists),
          albumArt: t.track.album.images[2].url,
          audio: t.track.preview_url,
          id: t.track.id,
        }
      })
    }

    const filteredSongs = songs.filter(s => s.audio);

    Handlers.success(res, 200, { songs: filteredSongs });
  } catch(e) {
    Handlers.error(res, e, 'getSongs');
  }
};
