import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, useParams } from "react-router-dom";
import AdminNavigation from "./shared/AdminNavigation";
const axios = require("axios");
const DeletePlan = (props) => {
  const params = useParams();
  useEffect(() => {
    axios
      .put(`http://localhost:8080/admin/removeplan/${params.userId}`)
      .then((res) => {
        localStorage.setItem("status", false)
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <AdminNavigation />,
        document.getElementById("nav1")
      )}
      <div className="text-white">plan deleted</div>
      <Link to="/admin/users">
        <button className="btn btn-success mt-2">back to users</button>
      </Link>
    </React.Fragment>
  );
};
DeletePlan.defaultProps = {
  userId: "61bf0c17ea12d718f13954d7",
};

export default DeletePlan;
