import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import UsersTable from '../components/UsersTable';

const AllUsers = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    return <Loader />;
  }
  if (!loading && user?.role === 'admin') {
    return <UsersTable />;
  } else {
    navigate('/dashboard');
    return;
  }
};

export default AllUsers;
