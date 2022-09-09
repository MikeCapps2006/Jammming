import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    // this.state.playlistTracks.map( playlistTrack => {
    //   console.log(track.id);
    //   if (playlistTrack.id === track.id){
    //     return 0;
    //   }
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      });
      return 0;
    // });
  };

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(playlistTrack => {
      return track.id !== playlistTrack.id;
    })
    this.setState({
      playlistTracks: tracks
    })
    return 0;
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(name, tracks){
    const playListTracks = tracks.map(track => JSON.stringify(track)).join('\n');
    console.log(`Saving tracks: \n${playListTracks} \nto Spotify to Playlist ${name}`);
    const uris = tracks.map(track => `${track.uri}`);
    return Spotify.savePlaylist(name, uris)
    .then(console.log('Playlist saved to Spotify!!!'))
    .then(this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    }));
  }

  search(searchTerm){
    Spotify.search(searchTerm)
      .then(searchResults => { this.setState({
        searchResults: searchResults
      })
    })}

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
        <SearchResults 
          searchResults={this.state.searchResults} 
          onAdd={this.addTrack} 
          />
        <Playlist 
          playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks} 
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}
          />
        </div>
        </div>
      </div>
    );
  }
  
}

export default App;
