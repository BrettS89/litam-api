const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const keys = require('../../config');
const GET_ACCESS_TOKEN = 'https://accounts.spotify.com/api/token';

const tokenOptions = {
  url: GET_ACCESS_TOKEN,
  method: 'post',
  params: {
    grant_type: 'client_credentials'
  },
  headers: {
    'Accept':'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  auth: {
    username: keys.spotifyClientId,
    password: keys.spofityClientSecret
  }
};

const spotifyApi = new SpotifyWebApi({
  clientId: keys.spotifyClientId,
  clientSecret: keys.spofityClientSecret,
  redirectUri: 'https://www.paradyse.app',
});

exports.searchSongs = async term => {
  const accessToken = await this.getAccessToken();
  spotifyApi.setAccessToken(accessToken);
  const { body } = await spotifyApi.searchTracks(term);
  return body.tracks.items;
};

exports.getPlaylist = async () => {
  const accessToken = await this.getAccessToken();
  spotifyApi.setAccessToken(accessToken);
  const { body } = await spotifyApi.getPlaylist('0L19ed1jq0LJefHgiBJgTD');
  return body.tracks.items;
};

exports.getAccessToken = async () => {
  try {
    const { data } = await axios(tokenOptions);
    return data.access_token;
  } catch(e) {
    console.log(e);
    throw e;
  }
};

exports.getTrack = async trackId => {
  const accessToken = await this.getAccessToken();
  const TRACK_URI = `https://api.spotify.com/v1/tracks/${trackId}`;

  const trackOptions = {
    url: TRACK_URI,
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  };

  const { data } = await axios(trackOptions);

  const song = {
    song: data.name,
    artist: this.formatArtists(data.artists),
    albumArt: data.album.images[2].url,
    audio: data.preview_url,
    id: data.id,
  }

  return song;
}

exports.formatArtists = artists => {
  const artistsArr = [];
  for (let i = 0; i < artists.length; i++) {

    if (i === 0) {
      artistsArr.push(artists[i].name);
    }

    if (i === 1 && artists.length === 2) {
      artistsArr.push(`feat. ${artists[i].name}`);
    }

    if (i === 1 && artists.length > 2) {
      artistsArr.push(`feat. ${artists[i].name},`);
    }

    if (i > 1 && i + 1 === artists.length) {
      artistsArr.push(artists[i].name);
    }

    if (i > 1 && i + 1 !== artists.length) {
      artistsArr.push(`${artists[i].name},`);
    }
  }
  return artistsArr.join(' ');
};
