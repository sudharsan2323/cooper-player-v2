import React from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';

import Card from './shared/Card'
import "./shared/CardSong.css"

const PlaylistItem = ({ playlistName, count, playlistId }) => {
    return (
        <Card>
            <div className="card mt-5 bg">
                <div className="card-header">{playlistName}</div>
                <div className="card-body">
                    <h5 className="card-title h6">playlist contain {count} {count>1 ? "songs" : "song"} </h5>

                    <Link to={{pathname: `/playlist/viewsong`, data:{playlistId} }} className="btn btn-primary btn-sm">
                        View playlist
                    </Link>
                    <Link to={{pathname: `/playlist/deleteplaylist`, data:{playlistId} }} className="btn btn-danger mx-2 btn-sm">
                        Delete playlist
                    </Link>
                </div>
            </div>
        </Card>
    )
}

export default PlaylistItem
