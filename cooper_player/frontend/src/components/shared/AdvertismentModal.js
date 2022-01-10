import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import "./AdvertismentModal.css"

const AdvertismentModal = (props) => {
    const [show, setShow] = useState(false);
    const button = useRef(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if(window.location.href.slice(22, 27) === "admin"){
            console.log("hello");
            return
        }
        
        if (localStorage.getItem("status") === "false" || !localStorage.getItem("status")) {
            setInterval(() => {
                console.log(window.location.href.slice(22, 28));
                if(window.location.href.slice(22, 28) === "signup" || window.location.href.slice(22, 28) === "signin"){
                    console.log("hello");
                }else{
                    button.current.click()

                }

            }, 180000)
        }
    }, [])
    return (
        <React.Fragment>
            <Button ref={button} variant="primary" onClick={handleShow} style={{ display: "none" }}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-black'>Beautiful Tree</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className='image' src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='advertisment'/>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default AdvertismentModal
