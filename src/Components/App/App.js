import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'Ole Happy Day',
          artist: 'Mike Capps',
          album: 'Beach Boyz Classc'
        },
        {
          id: 2,
          name: 'Heartbreak Hotel',
          artist: 'Elvis',
          album: 'Heartbreak Hotel Songz'
        }
      ],
      playlistName: 'My New Bike Riding Playlist',
      playlistTracks: [
        {
          id: 10,
          name: 'ThunderStruck',
          artist: 'AC/DC',
          album: 'ThunderStruck: The Album'
        },
        {
          id: 20,
          name: 'Techno',
          artist: 'TechnoDave',
          album: 'Techno Work Music'
        }
      ]
    }
  }
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar />
        <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} />
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
        </div>
        </div>
      </div>
    );
  }
  
}

export default App;
