import React, { useContext, useEffect, useState } from 'react';
import styles from './Profile.module.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { tokenContext } from '../../Context/tokenContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Profile() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [userId, setUserId] = useState([])
    const [allMessages, setAllMessages] = useState([])
    async function getMessages() {
        let { data } = await axios.get('https://sara7aiti.onrender.com/api/v1/message', {
            headers: {
                token: localStorage.getItem('userToken')
            }
        });
        console.log(data);
        setAllMessages(data.allMessages)
    }

    function getUserId() {
        let decoded = jwtDecode(localStorage.getItem('userToken'));
        setUserId(decoded.id)
    }

    useEffect(
        () => {
            getMessages()
            getUserId()
        }
    )


    return <>

        <div className='container text-center my-5'>
        </div>
        <div className="container text-center py-5 my-5 text-center">
            <div className="card py-5 mb-5">
                <Link to={'/profile'}>
                    <img src="https://cdn3.iconfinder.com/data/icons/media-player-music-video-minimalist-outline-1/48/Video_player_mode_ignito-1024.png" className="avatar img-fluid" alt />
                </Link>
                <h3 className="py-2">Ahmed Helmy</h3>
                {allMessages.length === 0 ? <div className="row">
                    <div className="col-md-12">
                        <div className="py-5">
                            <p>You don't have any messages</p>
                        </div>
                    </div>
                </div> : ""}
                {allMessages.map((ele) => <div key={ele._id} className="row text-center">
                    <div className="card w-50 col-md-12 mx-auto">
                        <div className="py-5">
                            <p>{ele.messageContent}</p>
                        </div>
                    </div>
                </div>)}

                <div className="container w-50 m-auto">
                </div>
            </div>
            <>
                <Link className="btn btn-default-outline" variant="primary" onClick={handleShow}>
                    <i className="fas fa-share-alt" /> Share Profile
                </Link>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {'http://localhost:3000/' + 'message/' + userId}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    </>
}