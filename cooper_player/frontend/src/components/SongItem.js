import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import "./shared/CardSong.css"
import { FaPlay, FaForward, FaBackward } from "react-icons/fa";

const SongItem = ({ title, url, status, songId, playlist }) => {
    const [count, setCount] = useState(0)
    const audio = useRef(null)
    const audioHandler = () => {
        setCount(count => {
            return count + 1
        })

        if (count % 2 === 0) {
            audio.current.play()

        }
        else {
            audio.current.pause()
            audio.current.currentTime = 0
        }

    }
    const forwardHandler = () => {
        if (audio.current.currentTime + 5 > audio.current.duration) {
            return
        }
        audio.current.currentTime += 5
    }
    const backwardHandler = () => {
        if (audio.current.current - 5 < 0) {
            return
        }
        audio.current.currentTime -= 5
    }
    return (
        <React.Fragment>
            <div className="card mt-5 bg">
                <div className="card-header">{status ? "pro" : "normal"}</div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>

                    <audio controls style={{ display: "none" }} id={songId} ref={audio}>
                        <source src={url} type="audio/mpeg" />
                    </audio>
                    <button className="btn btn-black btn-sm" onClick={audioHandler}>
                        <FaPlay />

                    </button>
                    <button className="btn btn-black btn-sm" onClick={forwardHandler}>
                        <FaForward />
                    </button>
                    <button className="btn btn-black btn-sm" onClick={backwardHandler}>
                        <FaBackward />
                    </button>
                    <Link to={{ pathname: "/playlist/deletesong", data: { playlist, songId } }}>
                        <button className='btn btn-sm btn-danger mx-2'>
                            Delete
                        </button>
                    </Link>

                </div>
            </div>
        </React.Fragment>
    )
}

export default SongItem
