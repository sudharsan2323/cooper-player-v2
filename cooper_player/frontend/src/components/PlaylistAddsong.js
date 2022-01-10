import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { useLocation, useHistory, Redirect } from 'react-router-dom'

const PlaylistAddsong = () => {
    const location = useLocation()
    const history = useHistory()
    const [err, setErr] = useState()
    const config = {
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth")}`

        }
    }
    useEffect(() => {
        axios.put(`http://localhost:8080/playlist/${location.data.playlistId}/user/${localStorage.getItem("user")}/song/${location.data.songId}`, {}, config)
            .then((res) => {
                history.push("/")
            })
            .catch((err) => {
                setErr(err.response.data.message)


            })
    }, [])
    return (
        <div>
            {err && (
                <React.Fragment>
                    <p className='text-white'>{err}</p>
                    <Redirect to="/"/>    

                
                </React.Fragment>
            )}
        </div>
    )
}

export default PlaylistAddsong
