import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
 const Login = (props) => {
    const [cred, setcred]=useState({email:"", pass:""});
    const onchange=(e)=>{
        setcred({...cred, [e.target.name] : e.target.value})
    }
    const host = process.env.REACT_APP_API_URL;
    let history=useNavigate();
    const sub=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: cred.email, password: cred.pass})
        });
        const json = await response.json();
        if(json.sucess){
            // Save the auth token and redirect
            props.showAlert("Logged in successfully", "success");
            localStorage.setItem('token', json.authToken);
            history("/");
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }
    return (
        <div><form onSubmit={sub}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" id="pass" name="pass"className="form-control"   onChange={onchange} />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form></div>
    )
}
export default Login;