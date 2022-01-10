import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { useLocation, useHistory } from 'react-router-dom'
import UserNavigation from './shared/UserNavigation'
const axios = require("axios")
const PlaylistDelete = () => {
    const location = useLocation()
    const history = useHistory()
    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth")}`

            }
        }
        axios.delete(`http://localhost:8080/playlist/${location.data.playlistId}/user/${localStorage.getItem("user")}`, config)
            .then((res) => {
                history.push("/playlist/viewplaylist")
            })
            .catch((err) => {
                console.log(err.response);
            })
    }, [])
    return (
        <div className='text-success'>
            {ReactDOM.createPortal(<UserNavigation />, document.getElementById("nav1"))}

            Playlist Deleted
        </div>
    )
}

export default PlaylistDelete
