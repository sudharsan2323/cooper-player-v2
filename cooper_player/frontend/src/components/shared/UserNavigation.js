import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const UserNavigation = (props) => {
    const [auth, setAuth] = useState(localStorage.getItem("auth"))
    const authHandler = () => {
        setAuth(localStorage.getItem("auth"))       
    }
    
    return (
        <React.Fragment>
            <div className="topnav" >
                <Link to={`/`}>Home</Link>
                <Link to={`/playlist/viewplaylist`}>Playlist</Link>
                <Link to={`/user/upgrade`}>Upgrade</Link>
                <Link to={`/user/queries`}>Queries</Link>
                <div className="topnav-right">
                    
                    {auth ? (
                        <React.Fragment>
                            <Link to={{ pathname: `/signout`, data: {authHandler} }}>Signout</Link>
                        
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link to={{ pathname: `/signin`, data: {authHandler}}}>
                                SignIn
                            </Link>
                            <Link to={`/signup`} id="signin">Signup</Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserNavigation;
