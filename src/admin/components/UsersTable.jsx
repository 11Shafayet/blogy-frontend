import { Table } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/common/Loader';
import { useQuery } from '@tanstack/react-query';

const UsersTable = () => {
  const [user, setUser] = useState();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
    setUser(loggedInUser);
  }, []);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get(
        `https://blogy-backend-sr.vercel.app/user/${user?._id}`
      );
      return res.data;
    },
    enabled: !!user,
  });

  // delete
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `https://blogy-backend-sr.vercel.app/user/${userId}`
      );

      toast.success('User Deleted Successfully!');
      console.log(response);
    } catch (error) {
      console.error('Axios error', error);
      toast.success('Failed to delete user!');
    } finally {
      refetch();
    }
  };

  //update role
  const handleUpdate = async (e, userId, index) => {
    e.preventDefault();
    const updatedRole = roles[index];

    try {
      setLoading(true);

      const response = await axios.patch(
        `https://blogy-backend-sr.vercel.app/user`,
        {
          userId,
          updatedRole,
        }
      );
      if (response) {
        toast.success('Role edited successfully!');
      } else {
        toast.success('Failed to update role!');
      }
    } catch (error) {
      console.error('Axios error', error);
    } finally {
      setLoading(false);
      refetch();
    }

    console.log(updatedRole, userId);
  };
  useEffect(() => {
    // Initialize the roles array with the initial roles from data
    if (data) {
      const initialRoles = data.map((item) => item.role);
      setRoles(initialRoles);
    }
  }, [data]);

  return (
    <div className="my-12 overflow-x-auto h-[700px] md:h-auto">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between gap-x-4 mb-12">
          <h2 className="text-center font-bold text-3xl md:text-5xl ">
            Manage Users
          </h2>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.length === 0 ? (
              <p className="text-center text-xl font-semibold">
                No User Found!
              </p>
            ) : (
              <Table striped className="relative">
                <Table.Head>
                  <Table.HeadCell className="text-start">
                    Picture
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">Name</Table.HeadCell>
                  <Table.HeadCell className="text-start">Email</Table.HeadCell>
                  <Table.HeadCell className="text-start">Role</Table.HeadCell>
                  <Table.HeadCell className="text-start">Edit</Table.HeadCell>
                  <Table.HeadCell className="text-start">Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {data?.map((item, i) => (
                    <Table.Row
                      className={`${
                        i % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      }  `}
                      key={i}
                    >
                      <Table.Cell>
                        <img
                          src={item?.pic}
                          alt=""
                          className="w-14 h-14 object-cover rounded-full"
                        />
                      </Table.Cell>
                      <Table.Cell className="whitespace-wrap font-bold text-gray-900 ">
                        {item?.name}
                      </Table.Cell>
                      <Table.Cell>{item?.email}</Table.Cell>
                      <Table.Cell>{item?.role}</Table.Cell>

                      <Table.Cell>
                        <form
                          action=""
                          onSubmit={(e) => handleUpdate(e, item._id, i)}
                        >
                          <select
                            name="role"
                            id="role"
                            value={roles[i]}
                            onChange={(e) => {
                              const updatedRoles = [...roles];
                              updatedRoles[i] = e.target.value;
                              setRoles(updatedRoles);
                            }}
                            className="bg-white p-2.5 px-4 font-semibold"
                            required
                          >
                            <option value="pending">Pending</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button type="submit">
                            {!loading ? (
                              <FaEdit
                                size={20}
                                className="text-teal-500 cursor-pointer ml-3"
                              />
                            ) : (
                              <Loader type="sync" size={11} />
                            )}
                          </button>
                        </form>
                      </Table.Cell>

                      <Table.Cell>
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDelete(item._id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
            <ToastContainer
              position="bottom-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
