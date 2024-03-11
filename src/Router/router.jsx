import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SinglePost from '../pages/SinglePost';

// admin routes
import AdminLayout from '../MainLayout/AdminLayout';
import MyBlogs from '../admin/pages/MyBlogs';
import AddBlog from '../admin/pages/AddBlog';
import AllUsers from '../admin/pages/AllUsers';
import PrivateRoute from './PrivateRoute';
import EditBlog from '../admin/pages/EditBlog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/:id',
        element: <SinglePost />,
      },
    ],
  },
  // admin routes
  {
    path: '/dashboard',
    element: <AdminLayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <MyBlogs />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/add-blog',
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/edit-blog/:id',
        element: (
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/all-users',
        element: (
          <PrivateRoute>
            <AllUsers />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
