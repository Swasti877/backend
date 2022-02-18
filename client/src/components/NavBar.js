import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">To-Do-Webapp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link type="button" to='/login' className=" mx-2" style={{
                                backgroundColor: "rgb(53,157,138)",
                                border: "none",
                                cursor: "pointer",
                                padding: "10px",
                                borderRadius: "5px",
                                color: "white",
                                textDecoration: "none"
                            }}>Login</Link>
                            <Link type="button" to='/signup' style={{
                                backgroundColor: "rgb(53,157,138)",
                                border: "none",
                                cursor: "pointer",
                                padding: "10px",
                                borderRadius: "5px",
                                color: "white",
                                textDecoration: "none"
                            }}>Signup</Link>
                        </form> : <form className="d-flex"><button type="button" className="mx-2" onClick={handleLogout}>Log Out</button></form>}
                    </div>
                </div>
            </nav>
        </>
    )
}