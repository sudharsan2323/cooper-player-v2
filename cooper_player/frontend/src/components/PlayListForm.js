import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom';

import UserNavigation from './shared/UserNavigation'
const axios = require("axios")
const PlayListForm = ({ userId }) => {
    const [playlistName, setPlaylistName] = useState("")
    const [err, setErr] = useState("")
    const [submit, setSubmit] = useState(false)
    const history = useHistory()
    const onChangeHandler = (e) => {
        setPlaylistName(e.target.value)
    }
    useEffect(() => {
        if (!localStorage.getItem("auth")) {
            return history.push("/")
        }
    }, [])
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const playlist = { playlistName }
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth")}`

            }
        }

        try {
            const data = await axios.post(`http://localhost:8080/playlist/new/user/${localStorage.getItem("user")}`, playlist, config)
            if(data){
                setErr("")
                setSubmit(true)
            }
            setTimeout(() => {
                history.push("/")

            }, 1000)
        } catch (error) {
            console.log(error.response);
            setErr(error.response.data.error)
            setSubmit(false)
        }
    }
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<UserNavigation />, document.getElementById("nav1"))}
            <div className='text-danger'>
                {err}
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">PlayList Name</label>
                    <input value={playlistName} onChange={onChangeHandler} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter playlist name" />

                </div>

                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
            {submit ? <p className='text-success mt-2'>Playlist added</p>: null}
        </React.Fragment>
    )
}

export default PlayListForm
