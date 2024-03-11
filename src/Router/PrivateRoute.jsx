import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const loggedInUser = await JSON.parse(localStorage.getItem('userInfo'));
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
      return <p>Loading...</p>;
  }

  if (user && user?.role !== 'pending') {
    return children;
  }
  if (user && user?.role === 'pending') {
    return <Navigate state={location.pathname} to={'/'} replace></Navigate>;
  }
  return <Navigate state={location.pathname} to={'/login'} replace></Navigate>;
};

export default PrivateRoute;
