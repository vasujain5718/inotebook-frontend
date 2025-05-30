import React from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const [credentials, setCredentials] = React.useState({ name: "", email: "", password: "" });
  const onchan = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  }
  const host = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const onsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (json.success === 0) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else if (json.success === 3) {
      props.showAlert("Email already exists", "danger");

    }
    else if (json.success === 2) {
      props.showAlert("name should be atleast 3 characters long", "danger");
    } else {
      props.showAlert("password must be atleast 5 charcters long", "danger");
    }
  }
  return (
    <div>

      <h1 className='text-center my-3'>Signup</h1>
      <form className='container' onSubmit={onsubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onchan} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onchan} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onchan} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
export default Signup