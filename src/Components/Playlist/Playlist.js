import './Playlist.css';
import React from 'react';
import TrackList from '../TrackLists/TrackLists';

class Playlist extends React.Component {
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  handleSave(e) {
    this.props.onSave(this.props.playlistName, this.props.playlistTracks);
  }
  
  render(){
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={this.props.playlistName} />
        <TrackList 
          tracks={this.props.playlistTracks} 
          onRemove={this.props.onRemove}
          isRemoval={true}
          />
        <button className="Playlist-save" onClick={this.handleSave}>SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default Playlist;

