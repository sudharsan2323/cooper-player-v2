import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Link, useHistory } from "react-router-dom"
import PlaylistItem from './PlaylistItem'
import UserNavigation from './shared/UserNavigation'
const ViewPlaylist = () => {
    const [playlists, setPlaylists] = useState([])
    const [err, setErr] = useState()
    const history = useHistory()

    useEffect(() => {
        if (!localStorage.getItem("auth")) {
            return history.push("/")
        }


        let mounted = true

        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth")}`

            }
        }
        
        axios.get(`http://localhost:8080/playlist/user/${localStorage.getItem("user")}`, config)
            .then((res) => {

                if(mounted){
                    setPlaylists(res.data.user.playlist)

                }


            })
            .catch(error => {
                setErr(error.response.data.message)
            })

            return () => {
                mounted = false
            }
        
    }, [])
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<UserNavigation/>, document.getElementById("nav1"))}
            <Link to="/playlist/playlistform">
                <button className='btn btn-info'>
                    Create Playlist
                </button>
            </Link>
            {(playlists.length === 0 && !err) && (
                <React.Fragment>
                    <div className='mt-2 text-white'>
                        Loading
                    
                    </div>
                </React.Fragment>
            )}
            {
                playlists && playlists.map((playlist, index) => {
                    
                    return (
                        <PlaylistItem key={index} playlistId = {playlist._id} playlistName={playlist.playlistName} count={playlist.song.length} />
                    )
                })
            }
            {
                err && <p className='h6 mt-2 text-white'>{err}</p>
            }
            
        </React.Fragment>
    )
}

export default ViewPlaylist
