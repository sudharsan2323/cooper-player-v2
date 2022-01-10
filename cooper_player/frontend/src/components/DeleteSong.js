import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation, useHistory } from "react-router-dom";
import AdminNavigation from "./shared/AdminNavigation";
const axios = require("axios");
const DeleteSong = (props) => {
  const location = useLocation();
  const history = useHistory()
  useEffect(() => {
    axios
      .delete(`http://localhost:8080/admin/deletesong/${location.data.songId}`)
      .then((res) => {
        history.push("/admin/songs")
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {ReactDOM.createPortal(
        <AdminNavigation />,
        document.getElementById("nav1")
      )}
      <p className="text-success h6">
        song deleted
      </p>
    </div>
  );
};

export default DeleteSong;
