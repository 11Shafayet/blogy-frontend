import { Table } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/common/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const MyBlogs = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
    setUser(loggedInUser);
  }, []);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const res = await axios.get(
        `https://blogy-backend-sr.vercel.app/posts/${user._id}`
      );
      // setPosts(res.data);
      return res.data;
    },
    enabled: !!user,
  });

  // delete
  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `https://blogy-backend-sr.vercel.app/posts/${postId}`
      );

      toast.success('Post Deleted Successfully!');
      console.log(response);
    } catch (error) {
      console.error('Axios error', error);
      toast.success('Failed to delete post!');
    } finally {
      refetch();
    }
  };

  return (
    <div className="my-12 overflow-x-auto h-[700px] md:h-auto">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between gap-x-4 mb-12">
          <h2 className="text-center font-bold text-3xl md:text-5xl ">
            Manage Posts
          </h2>

          <Link
            to="/dashboard/add-blog"
            className="font-bold bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 hover:translate-y-1 duration-500"
          >
            Add New Post
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.length === 0 ? (
              <p className="text-center text-xl font-semibold">
                No Data Found!
              </p>
            ) : (
              <Table striped className="relative">
                <Table.Head>
                  <Table.HeadCell className="text-start">
                    Thumbnail
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">Title</Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    Description
                  </Table.HeadCell>
                  <Table.HeadCell className="text-start">
                    Edit Post
                  </Table.HeadCell>
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
                          className="w-28 h-16 object-cover rounded"
                        />
                      </Table.Cell>
                      <Table.Cell className="font-bold text-gray-900 max-w-[400px]">
                        {item?.title}
                      </Table.Cell>
                      <Table.Cell className="max-w-[300px] truncate">
                        {item?.desc}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/dashboard/edit-blog/${item?._id}`}>
                          <FaEdit
                            size={20}
                            className="text-teal-500 cursor-pointer ml-3"
                          />
                        </Link>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
