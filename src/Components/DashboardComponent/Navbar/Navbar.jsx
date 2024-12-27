
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../../redux/actionCreators/authActionCreator";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to="/dashboard">
          File Management System
        </Link>

        <ul className="navbar-nav ms-auto me-5">
          {isAuthenticated ? (
            <>
              <li className="nav-item d-flex align-items-center mx-2">
                <p className="my-0 mt-2 mx-2">
                  <span className="text-light">Welcome </span>
                  <span className="fw-bold text-light">{user.displayName}</span>
                </p>
                <Link className="btn btn-success btn-sm me-2" to="/">
                  Home
                </Link>
                <button
                  className="btn btn-primary "
                  onClick={() => dispatch(signOut())}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-success btn-sm me-2" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-success btn-sm me-2" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
