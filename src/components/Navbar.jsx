import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import SearchBar from './SearchBar';
import { FaGlobe } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useContext(BlogContext);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <FaGlobe /> AJ-Blogs
      </Link>
      <SearchBar />
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <button onClick={logout} className="auth-button">
            Logout ({user.username})
          </button>
        ) : (
          <Link to="/login" className="auth-button">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;