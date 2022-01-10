import React from "react";
import { Link } from "react-router-dom";
import "./CardSong.css"

const CardUser = ({email, name, status, userId}) => {
  return (
    <React.Fragment>
      <div className="card mt-5 bg">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{status?"pro": "normal"}</h6>
          <p className="card-text">User Email: {email}</p>
          <Link to={`/admin/addplan/${userId}`}  className="card-link">
            <button className="btn btn-success btn-sm">
              Add Plan
            
            </button>
            
          </Link>
          <Link to={`/admin/deleteplan/${userId}`} className="card-link">
            <button className="btn btn-danger btn-sm">
              Remove plan
            
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardUser;
