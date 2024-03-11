import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../components/common/Loader';
import PopularPosts from '../components/PopularPosts';

const SinglePost = () => {
  const [post, setPost] = useState([]);
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname) {
      setPath(pathname.split('/').pop(''));
    }
  }, [pathname]);

  // fetch single posts
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const res = await axios.get(
        `https://blogy-backend-sr.vercel.app/posts/single/${path}`
      );
      setPost(res.data);
      return res.data;
    },
    enabled: !!path,
  });

  useEffect(() => {
    if (path) {
      console.log(path);
      refetch();
      setLoading(false);
    }
  }, [path]);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {isLoading ? (
          <Loader />
        ) : post ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
            <div className="md:col-span-2 flex flex-col gap-y-2">
              <img
                src={post.pic}
                alt=""
                className="rounded-xl shadow-xl max-w-full h-auto max-h-[450px] object-cover"
              />
              <div className="p-3">
                <h4 className="text-2xl font-bold line-clamp-2 text-ellipsis overflow-x-hidden">
                  {post.title}
                </h4>
                <p className="text-sm font-bold my-3">
                  By <span className="text-primary">{post.author}</span>
                </p>
                <p className="text-sm line-clamp-3 text-ellipsis overflow-x-hidden italic leading-relaxed opacity-75">
                  {post.desc}
                </p>
              </div>
            </div>

            {/* sidebar */}
            <div className="">
              <div className="bg-[#FFF9F3] px-4 md:px-6 py-6 rounded-xl border border-[#ffe7d0]">
                <h4 className="text-2xl font-bold">Popular Posts</h4>
                <PopularPosts />
              </div>
            </div>
          </div>
        ) : (
          <h4>Nothing found here</h4>
        )}
      </div>
    </section>
  );
};

export default SinglePost;
