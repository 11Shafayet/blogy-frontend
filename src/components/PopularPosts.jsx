import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../components/common/Loader';

const PopularPosts = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
    setUser(loggedInUser);
  }, []);

  // fetch all posts
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const res = await axios.get(
        `https://blogy-backend-sr.vercel.app/posts/${user?._id}`
      );
      setPosts(res.data);
      return res.data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (user) {
      refetch();
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-4 md:gap-y-6 mt-6">
      {loading ? (
        <Loader />
      ) : posts.length > 0 ? (
        posts.slice(0, 3).map((item, i) => {
          return (
            <Link to={`/${item?._id}`} className="flex gap-y-2 group" key={i}>
              <div className="w-1/3">
                <img
                  src={item.pic}
                  alt=""
                  className="rounded-xl shadow-xl max-w-full h-auto object-cover"
                />
              </div>
              <div className="w-2/3 p-3">
                <h4 className="text-sm font-bold line-clamp-2 text-ellipsis overflow-x-hidden group-hover:text-primary">
                  {item.title}
                </h4>

                <div>
                  <Link
                    to={`/${item?._id}`}
                    className="relative rounded-md font-medium capitalize underline opacity-75 text-[11px] hover:text-primary"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div>
          <h4>No post found</h4>
        </div>
      )}
    </div>
  );
};

export default PopularPosts;
