import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const [cred, setCred] = useState({ email: '', password: '', cpassword: '' });
    const { showAlert } = props;
    const navigate = useNavigate();
    const PORT = process.env.PORT || 5000;
    const DOMAIN = process.env.DOMAIN || "http://localhost:"
    const host = `${DOMAIN}${PORT}/api`
    // `http://localhost:${PORT}/api`
    
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    const handleLogin = (e) => {
        e.preventDefault();
        if (cred.email.length > 0 && cred.password === cred.cpassword) {
            Login(cred.email, cred.password)
            setCred({ email: '', password: '', cpassword: '' });
        } else if (cred.password !== cred.cpassword) {
            showAlert('Confirm password is Different', 'warning')
        } else {
            showAlert('Enter Valid Input', 'warning')
        }
    }
    const Login = async (email, password) => {

        const respone = await fetch(`${host}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const json = await respone.json();
        if (json.success === true) {
            localStorage.setItem('token', json.authtoken)
            showAlert('Login Successfully', 'success')
            navigate('/')
        } else {
            showAlert('Invalid Details', 'warning')
        }
    }
    return (
        <>
            <div className="container my-2">
                <div className='conta'>
                    <form>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" id='email' name='email' onChange={onChange} value={cred.email} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" id='password' name='password' onChange={onChange} value={cred.password} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" id='cpassword' name='cpassword' onChange={onChange} value={cred.cpassword} />
                            <label htmlFor="floatingPassword">Confirm Password</label>
                        </div>
                        <button type="button" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}