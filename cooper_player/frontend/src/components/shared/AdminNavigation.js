import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const AdminNavigation = () => {
    return (
        <React.Fragment>
            <div className="topnav" >
                <Link to={`/admin/users`}>Users</Link>
                <Link to={`/admin/songs`}>Songs</Link>
                <Link to={`/admin/queries`}>Queries</Link>

                <div className="topnav-right">
                    <Link to="/admin/addsong">
                        Add song
                    </Link>


                </div>
            </div>
        </React.Fragment>
    );
};

export default AdminNavigation;
