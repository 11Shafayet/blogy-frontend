import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../components/common/Loader';

const Home = () => {
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
        `https://blogy-backend-sr.vercel.app/posts/65eb12a737db206ab9e13ccc`
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
    <div>
      <div className="container px-4 mx-auto my-6 md:my-20 max-w-7xl">
        {/* blogs */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
          {loading ? (
            <Loader />
          ) : posts.length > 0 ? (
            posts.map((item, i) => {
              return (
                <div className="flex flex-col gap-y-2" key={i}>
                  <img
                    src={item.pic}
                    alt=""
                    className="rounded-xl shadow-xl max-w-full h-[250px] object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-2xl font-bold line-clamp-2 text-ellipsis overflow-x-hidden">
                      {item.title}
                    </h4>
                    <p className="text-sm font-bold my-3">
                      By <span className="text-primary">{item.author}</span>
                    </p>
                    <p className="text-sm line-clamp-3 text-ellipsis overflow-x-hidden italic leading-relaxed opacity-75">
                      {item.desc}
                    </p>
                    <div className="mt-6">
                      <Link
                        to={`/${item?._id}`}
                        className="relative overflow-hidden border border-primary rounded-md font-bold uppercase text-[12px] py-2.5 px-6 group hover:text-white duration-500"
                      >
                        <div className="absolute top-0 left-0 w-0 h-full bg-primary group-hover:w-full duration-300 -z-10" />
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h4>No post found</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
