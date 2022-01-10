import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';

import { useLocation, Redirect, useHistory } from 'react-router-dom'
import UserNavigation from './shared/UserNavigation'
import SongItem from "./SongItem"

const PlaylistViewSong = () => {
    const [songs, setSongs] = useState(null)
    const [playlist, setPlaylist] = useState([])
    const location = useLocation()
    const history = useHistory()


    const config = {
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth")}`

        }
    }
    useEffect(() => {
        if(!location.data){
            return history.push("/")
        }
        axios.get(`http://localhost:8080/playlist/${location.data.playlistId}`, config)
            .then((res) => {
                setSongs(res.data.playlist.song)
                setPlaylist(res.data.playlist)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <React.Fragment>
            {   
                !location.data ? <Redirect to="/"/>: null
            }
            {ReactDOM.createPortal(<UserNavigation />, document.getElementById("nav1"))}
            {(songs!== null && songs.length === 0) && (
                <React.Fragment>
                    <p className='text-info'>no song added to this playlist</p>
                </React.Fragment>
            )}
            {songs && songs.map((song) => {
                return <SongItem key={song._id} songId = {song._id} playlist={playlist} title={song.songTitle} url={song.songUrl} status={song.status} />
            })}
        </React.Fragment>
    )
}

export default PlaylistViewSong
