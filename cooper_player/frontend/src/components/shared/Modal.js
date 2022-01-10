import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Modal.css"
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';


const Modals = ({ songId, songStatus }) => {
    const [playlists, setPlaylists] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if(!localStorage.getItem("user")){
            return
        }
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth")}`

            }
        }
        let mounted = true
        axios.get(`http://localhost:8080/playlist/user/${localStorage.getItem("user")}`, config)
            .then((res) => {
                if(mounted){
                    setPlaylists(res.data.user.playlist)

                }
                
            })
            .catch(err => {
                console.log(err);
            })
            return () => {
                mounted = false
            }
    }, [])
    return (
        <React.Fragment>

            {localStorage.getItem("user")? songStatus ? (localStorage.getItem("status") === "true" ? (<Button variant="success btn-sm mx-2" onClick={handleShow}>
                Add to playlist
            </Button>) : null) : (<Button variant="success btn-sm mx-2" onClick={handleShow}>
                Add to playlist
            </Button>): null}


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select the playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {

                        playlists && playlists.map((playlist, index) => {
                            const playlistId = playlist._id
                            return (
                                <Link to={{ pathname: `/playlist/addsong`, data: { songId, playlistId } }} key={index} className="modal-body">
                                    <button className='btn btn-secondary mt-2'>
                                        {playlist.playlistName}

                                    </button>
                                </Link>
                            )
                        })
                    }
                    {   
                        (playlists !== null && playlists.length === 0) && (
                            <React.Fragment>
                                
                                <p className='text-black'>No playlist found</p>
                                <Link to="/playlist/playlistform" className='btn btn-success btn-sm'>Create Playlist</Link>
                            </React.Fragment>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default Modals
