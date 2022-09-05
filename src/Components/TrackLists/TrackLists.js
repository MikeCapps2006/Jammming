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
                        <Track key={track.id} track={track} />
                    )
                })
               }
            </div>
        )
    }
}

export default TrackLists;

