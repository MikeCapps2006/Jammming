const clientId = 'ce870eb4a0024d77b8bc26f34f1e75a6';
const redirectUri = 'http://localhost:3000';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;
let userAccessToken = undefined;
let expiresIn = undefined;
// http://mikecappsjamming.surge.sh
const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      userAccessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = spotifyUrl;
    }
  },

  async search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return await fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      });
  },

  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) return;
    const userUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${userAccessToken}`
    };
    let userId = undefined;
    let playlistId = undefined;
    await fetch(userUrl, {
      headers: headers 
    })
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(async () => {
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
     await fetch(createPlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: playlistName
          })
        })
        .then(response => response.json())
        .then(jsonResponse => playlistId = jsonResponse.id)
        .then(async () => {
          const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          await fetch(addPlaylistTracksUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackUris
            })
          });
        })
    })
  }
};

export default Spotify;
// import React from 'react';

// const clientID = 'ce870eb4a0024d77b8bc26f34f1e75a6';
// const redirectUri = 'http://mikecappsjamming.surge.sh';
// const spotifyUri = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
// let userAccessToken;
// let expiresIn;

// class Spotify extends React.Component{
//     getAccessToken(){
//         console.log('got em');
//         if(userAccessToken){
//             return userAccessToken;
//         }
//         const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
//         const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
//         if(urlAccessToken && urlExpiresIn){
//             userAccessToken = urlAccessToken;
//             expiresIn = urlExpiresIn;
//             window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
//             window.history.pushState('Access Token', null, '/');
//         } else {
//             window.location = spotifyUri;
//         }
//     }

//    async search(term){
//     console.log('searching');
//         const searchUri = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
//         const authHeaders = {
//             headers: {Authorization: `Bearer ${this.getAccessToken}`}
//           };
//         return await fetch(searchUri, authHeaders)
//           .then(response => response.json())
//           .then(jsonResponse => {
//             if(!jsonResponse.tracks) return [];
//             return jsonResponse.tracks.items.map(track => {
//                 return {
//                     id: track.id,
//                     name: track.name,
//                     artist: track.artist[0].name,
//                     album: track.album.name,
//                     uri: track.uri
//                 }
//             })
//           })
//     }

//     savePlaylist(playlistName, tracks){
//         if (!playlistName || !tracks) return;
//         const userURL = 'https://api.spotify.com/v1/me';
//         const headers = {
//             Authorization: `Bearer ${userAccessToken}`
//           };
//         let userID;
//         let playlistID;
//         fetch(userURL, headers)
//           .then (response => response.json())
//           .then (jsonResponse => userID = jsonResponse.id)
//           .then (() => {
//             const createPlaylistUrl = `https://api.spotify.com/v1/users/${userID}/playlists`;
//             fetch(createPlaylistUrl, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify({
//                   name: playlistName
//                 })
//               })})
//               .then(response => response.json())
//               .then(jsonResponse => playlistID = jsonResponse.id)
//               .then(() => {
//                 const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
//                 fetch(addPlaylistTracksUrl, {
//                     method: 'POST',
//                     headers: headers,
//                     body: JSON.stringify({
//                         uris: tracks
//                 })
//               });
//           })
          
        
//     }
// }

// export default Spotify;