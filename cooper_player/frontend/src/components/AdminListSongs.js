import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import AdminSong from './AdminSong'
import AdminNavigation from './shared/AdminNavigation'

const AdminListSongs = () => {
    const [songs, setSongs] = useState()
    const [err, setErr]  = useState()
    useEffect(() => {

        axios.get("http://localhost:8080/")
            .then((res) => {
                setSongs(res.data.song)
            })
            .catch((err) => {
                setErr(err.response.data.message)
            })
    }, [])
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<AdminNavigation />, document.getElementById("nav1"))}
            {
                songs && songs.map((song) => {
                    return <AdminSong key={song._id} song={song} />
                })
            }
            {
                err && (
                    <React.Fragment>
                        <p className='text-danger'>no song found</p>
                        <Link to={`/admin/addsong`}>
                            <button className='btn btn-info'>
                                Addsong
                            </button>
                        </Link>
                    </React.Fragment>
                    
                    )
            }
        </React.Fragment>
    )
}

export default AdminListSongs
