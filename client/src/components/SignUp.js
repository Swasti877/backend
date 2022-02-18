import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingUp(props) {
    const [cred, setCred] = useState({ username: "", password: "", email: "", cpassword: "" })
    const navigate = useNavigate();
    const PORT = process.env.PORT || 5000;
    const DOMAIN = process.env.DOMAIN || "http://localhost:"
    const host = `${DOMAIN}${PORT}/api`
    const { showAlert } = props;

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        if (cred.email.length > 0 && cred.password === cred.cpassword && cred.password.length > 0 && cred.username.length > 0) {
            Signup(cred.username, cred.email, cred.password);
            setCred({ username: "", password: "", email: "", cpassword: "" })
        } else if (cred.password !== cred.cpassword) {
            showAlert('Confirm password is Different', 'warning')
        }
        else {
            showAlert('Invalid Credentials', 'warning')
        }
    }
    //Signup
    const Signup = async (username, email, password) => {
        const respone = await fetch(`${host}/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ username, email, password })
        })
        const json = await respone.json();
        if (json.success === true) {
            localStorage.setItem('token', json.authtoken)
            navigate('/')
            showAlert('Created Account Successfully', 'success')
        } else {
            showAlert('Enter valid Input', 'warning')
        }
    }
    return (
        <>
            <div className="container my-2">
                <div className='conta'>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" id='username' name='username' onChange={onChange} value={cred.username} />
                        <label htmlFor="floatingInput">User Name</label>
                    </div>
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
                    <button type="button" onClick={handleSignUp}>SignUp</button>
                </div>
            </div>
        </>
    )
}