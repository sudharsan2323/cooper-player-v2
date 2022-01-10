import React from 'react'
import "./shared/CardSong.css"
const AdminQuery = ({ queryId, content, user }) => {
    return (
        <React.Fragment>
            <div className="card mt-4 bg">
                <div className="card-body text-black">
                    <h5 className="card-title">User Email: {user.email}</h5>
                    <h6 className="card-subtitle text-muted">{user.status ? "Pro": "Normal"}</h6>
                    <p className="card-text">Subject: {content}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminQuery
