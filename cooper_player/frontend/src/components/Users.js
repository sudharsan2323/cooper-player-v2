import React, { useEffect, useState } from 'react'
import CardUser from './shared/CardUser'
import ReactDOM from 'react-dom';
import AdminNavigation from './shared/AdminNavigation';
const axios = require("axios")
const Users = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/user")
            .then((res) => {
                setUsers(res.data.users)
   
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <React.Fragment>
            {ReactDOM.createPortal(<AdminNavigation />, document.getElementById("nav1"))}
            {
                users && users.map((user) => {
                    return <CardUser key={user._id} name={user.name} email={user.email} status={user.status} userId={user._id} />
                })
            }
        </React.Fragment>

    )
}

export default Users
