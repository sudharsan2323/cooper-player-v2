import axios from 'axios'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useLocation, useHistory } from 'react-router-dom'
import UserNavigation from './shared/UserNavigation'

const PlaylistDeleteSong = () => {
    const location = useLocation()
    const history = useHistory()
    
    useEffect(() => {
        if(!location.data){
            return history.push("/")
        }
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth")}`
    
            }
        }
        axios.delete(`http://localhost:8080/playlist/deleteplaylist/${location.data.playlist._id}/song/${location.data.songId}`, config)
        .then((res) => {
            history.push("/")
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<UserNavigation />, document.getElementById("nav1"))}

            <div className='text-info'>
                removed from playlist
            </div>
        
        </React.Fragment>
    )
}

export default PlaylistDeleteSong
