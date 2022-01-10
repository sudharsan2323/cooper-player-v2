import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import AdminNavigation from "./shared/AdminNavigation"
import AdminQuery from './AdminQuery'
const AdminQueries = () => {
    const [queries, setQueries] = useState(null)
    const [err, setErr] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:8080/admin/queries")
            .then((res) => {
                setQueries(res.data.queries)
            })
            .catch((err) => {
                setErr(true)
            })
    }, [])
    if (err) {
        return (
            <React.Fragment>
                {ReactDOM.createPortal(<AdminNavigation />, document.getElementById("nav1"))}
                <p className='text-danger'>No Query Found</p>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<AdminNavigation />, document.getElementById("nav1"))}
            {queries && queries.map((query) => {
                return <AdminQuery key={query._id} queryId={query._id} content={query.content} user={query.user}></AdminQuery>
            })}
            {(queries !== null && queries.length === 0) && <p className='text-danger'>No queries found</p>}
        </React.Fragment>
    )
}

export default AdminQueries
