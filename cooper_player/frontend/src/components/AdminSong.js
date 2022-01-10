import React from 'react'
import { Link } from 'react-router-dom'
import "./shared/CardSong.css"


const AdminSong = ({ song }) => {
    const songId = song._id
    return (
        <React.Fragment>
            <div className="card my-4 bg">
                <div className="card-body">
                    <h5 className="card-title text-black" style={{fontSize: "20px"}}>{song.songTitle}</h5>
                    <h6 className="card-subtitle mb-2 h6 text-muted">{song.status ? "Pro" : "Normal"}</h6>
                    <Link to={{pathname: `/admin/deletesong`, data: {songId}}} className="card-link btn btn-danger btn-sm">Delete Song</Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminSong
