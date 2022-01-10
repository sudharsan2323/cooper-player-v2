import axios from 'axios'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';

import { useHistory, Link } from 'react-router-dom'
import UserNavigation from './shared/UserNavigation'

const Upgrade = () => {
    const history = useHistory()
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            return history.push("/")
        }
        if(localStorage.getItem("status")==="true"){
            return  history.push("/")
        }
        axios.put(`http://localhost:8080/admin/addplan/${localStorage.getItem("user")}`)
            .then((res) => {
                localStorage.setItem("status", true)
                setTimeout(() => {
                    history.push("/")
                }, 1000)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<UserNavigation />, document.getElementById("nav1"))}
            <div className='mb-2 text-success'>
                Congratulation you are now pro user

            </div>
            <Link to="/">
                <button className="btn btn-info btn-sm">
                    Back to Main page
                </button>

            </Link>

        </React.Fragment>
    )
}

export default Upgrade
