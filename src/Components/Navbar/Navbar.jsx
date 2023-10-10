import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/tokenContext'

export default function Navbar() {
    let { token, setToken } = useContext(tokenContext);
    let navigate = useNavigate()

    function logOut() {
        localStorage.removeItem('userToken');
        setToken(null);
        navigate ('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>Sara7a</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {token ? <>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/profile'}>Profile</Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={logOut} className="nav-link">Logout</button>
                            </li>
                        </> : <>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/register'}>Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/login'}>Login</Link>
                            </li>
                        </>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
