import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import CardSong from "./shared/CardSong";
import UserNavigation from "./shared/UserNavigation";

const axios = require("axios");
const DisplaySong = () => {
  const [songs, setSong] = useState([])
  const [err, setErr] = useState([])
  useEffect(() => {
    let mounted = true;
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        if(mounted){
          setSong(res.data.song);
          setErr("")
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
        
      });
      return () => {
        mounted = false
      }
  }, []);
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<UserNavigation />, document.getElementById("nav1"))}
      {!localStorage.getItem("auth") ? (

        <div className="text-danger">
          please sign in
        </div>

      ) : <React.Fragment></React.Fragment>}
      {songs.map(song => {
        return (
          <CardSong key={song._id} songId={song._id} songTitle={song.songTitle} songUrl={song.songUrl} status={song.status} />
        )
      })}
      {err && <p className="text-danger">{err}</p>}
    </React.Fragment>

  );
};

export default DisplaySong;
