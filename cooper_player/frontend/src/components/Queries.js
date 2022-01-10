import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import UserNavigation from './shared/UserNavigation';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Queries = () => {
    const [query, setQuery] = useState("")
    const [submit, setSubmit] = useState(false)
    const [err, setErr] = useState("")
    const history = useHistory()
    const onChangeHandler = (e) => {
        setQuery(e.target.value)
    }
    useEffect(() => {
        if(!localStorage.getItem("user")){
            history.push("/")
        }
        if(localStorage.getItem("status") === "false"){
            history.push("/")
        }
    })
    const onSubmitHandler = (e) => {
        e.preventDefault()
        
        const queries = {
            content: query,
            userId: localStorage.getItem("user")
        }
        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth")}`
    
            }
        }

        axios.post(`http://localhost:8080/user/queries`, queries, config)
        .then((res) => {
            setSubmit(true)
            setErr("")
            setTimeout(() => {
                history.push("/")
            }, 1000)
            
        })
        .catch((err) => {
            console.log(err);
            setErr(err.response.data.error)
        })

    }
    return (
        <React.Fragment>

            {ReactDOM.createPortal(<UserNavigation />, document.getElementById("nav1"))}
            <div className='text-danger'>
                {err}
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Query</label>
                    <textarea value={query} onChange={onChangeHandler} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='query'></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
            {submit && <p className='text-success mt-2'>queries is successfully submitted</p>}
        </React.Fragment>
    )
}

export default Queries
