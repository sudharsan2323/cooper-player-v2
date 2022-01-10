import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactDOM from 'react-dom';
import AdminNavigation from './shared/AdminNavigation'
const axios = require("axios")
const AddPlan = (props) => {

    const params = useParams()
    useEffect(() => {
        
        axios.put(`http://localhost:8080/admin/addplan/${params.userId}`, { status: true })
            .then((res) => {
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<AdminNavigation />, document.getElementById("nav1"))}
            <div className='text-white'>
                plan added

            </div>
            <Link to="/admin/users">
                <button className='btn btn-success mt-2'>
                    Back to users

                </button>
            </Link>
        </React.Fragment>
    )
}

export default AddPlan
