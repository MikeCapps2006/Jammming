import './TrackLists.css';
import React from 'react';
import Track from '../Track/Track';

class TrackLists extends React.Component {
    render(){
        return (
            <div className="TrackList">
               {
                this.props.tracks.map(track => {
                    return (
                        <Track 
                            key={track.uri} 
                            track={track} 
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval}
                        />
                    )
                })
               }
            </div>
        )
    }
}

export default TrackLists;

