// import React from 'react';
// // import AuthService from '../services/authService';

// const Navbar = ({ user, onLogout }) => {
//   const handleLogout = () => {
//     // AuthService.logout();
//     localStorage.removeItem('userToken');
//     onLogout();
//   };

//   return (
    
//     <nav>
//       <ul>
//         {user ? (
//           <>
//             {/* <li>{user.email}</li> */}
//             <li><button onClick={handleLogout}>Logout</button></li>
//           </>
//         ) : (
//           <>
//             <li><a href="/login">Login</a></li>
//             <li><a href="/register">Register</a></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    onLogout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span ><Link to="/" className="netflix-logo-text" style={{ textDecoration: 'none' }}>BLRFLIX</Link></span>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            {/* Uncomment if you want to display the user's email */}
            {/* <span className="user-email">{user.email}</span> */}
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/register" className="nav-button">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

