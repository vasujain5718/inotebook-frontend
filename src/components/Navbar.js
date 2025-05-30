import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar(props) {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location === "/" ? "active" : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          <div className="d-flex">
            {!localStorage.getItem('token') ? (
              <>
                <Link className='btn btn-light text-primary rounded-pill mx-1 px-4 fw-semibold shadow-sm' to="/login">
                  Login
                </Link>
                <Link className='btn btn-outline-light rounded-pill mx-1 px-4 fw-semibold shadow-sm' to="/signup">
                  Signup
                </Link>
              </>
            ) : (
              <button
                className="btn btn-light text-primary rounded-pill mx-1 px-4 fw-semibold shadow-sm"
                onClick={() => {
                  localStorage.removeItem('token');
                  props.showAlert("Logged out successfully", "success");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;