import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '/images/logo-white.png';

const Navbar = () => {
  const { activeNav, setActiveNav } = useAuth();
  const [isUser, setIsUser] = useState(null);
  const [activeProfile, setActiveProfile] = useState(false);

  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem('userInfo'));
    setIsUser(userExists);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setIsUser(null);
  };

  return (
    <>
      <div className="bg-primary text-white font-primary w-full">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-3">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-12 object-cover" />
            </Link>
            <div className="flex items-center">
              {!isUser ? (
                <>
                  <Link
                    to="/login"
                    className={`uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 cursor-pointer ${
                      activeNav === 'login' && 'bg-black bg-opacity-15'
                    }`}
                    onClick={() => {
                      setActiveNav('login');
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 cursor-pointer ${
                      activeNav === 'register' && 'bg-black bg-opacity-15'
                    }`}
                    onClick={() => {
                      setActiveNav('register');
                    }}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div
                  className="relative bg-gray-100 rounded-full cursor-pointer"
                  onClick={() => setActiveProfile((prev) => !prev)}
                >
                  <img
                    src={isUser?.pic}
                    alt=""
                    className="w-11 h-11 rounded-full"
                  />
                  {activeProfile && (
                    <div className="absolute bg-white text-black top-full right-0 rounded-md z-[100] pt-4 shadow">
                      <Link
                        to={`/dashboard`}
                        className="uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 font-bold cursor-pointer"
                      >
                        Dashboard
                      </Link>
                      <h4
                        className="uppercase hover:bg-black hover:bg-opacity-15 py-4 px-5 duration-500 font-bold cursor-pointer"
                        onClick={logoutHandler}
                      >
                        Logout
                      </h4>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
