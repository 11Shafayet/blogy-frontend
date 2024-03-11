import { Outlet } from 'react-router-dom';
import Navbar from '../admin/components/Navbar';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
};

export default AdminLayout;
