import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";
import "./AddSong.css"
import AdminNavigation from './shared/AdminNavigation';
const axios = require("axios");
const AddSong = (props) => {
  const [songName, setSongName] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [status, setStatus] = useState(false);
  const [upload, setUpload] = useState(false);
  const [err, setErr] = useState("")
  const history = useHistory()
  const onSongChange = (e) => {
    setSongName(e.target.value);
  };

  const onSongUrlChange = (e) => {
    setSongFile(e.target.files[0])
  };

  const onStatusChange = (e) => {
    setStatus(e.target.checked);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setUpload(true)
    const data = new FormData() 
    data.append('song', songFile)
    data.append("songTitle", songName)
    data.append("status", status)
    

    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          'Accept': 'application/json'
      }
    };

    axios
      .post("http://localhost:8080/admin/addsong", data, config)
      .then((res) => {
        setUpload(false)
        setErr("")
        history.push("/admin/songs")
      })
      .catch((err) => {
        setErr(err.response.data.error);
        setUpload(false)
      });
  };
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<AdminNavigation />, document.getElementById("nav1"))}
      <div className="text-danger">
        {err}
      </div>
      <form onSubmit={onSubmitHandler} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1 text-white">Song Name</label>
          <input
            onChange={onSongChange}
            type="text"
            value={songName}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Song Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="formFileMultiple">Song File</label>
          <input className="form-control" type="file" name="song" onChange={onSongUrlChange} id="formFileMultiple" />
        </div>
        
        <div className="form-group form-check">
          <input
            value={status}
            onChange={onStatusChange}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Pro song
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="text-info mt-2">
        {upload? "Uploading": null}
      </div>
    </React.Fragment>
  );
};

export default AddSong;
