import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:"" })
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name,email,password} = credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history('/')
            props.showAlert("Account Created Successful","success")
        } else {
            props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1 className='my-3'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} placeholder="Enter Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter Email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Enter Password" minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} placeholder="Enter Confirm Password" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup