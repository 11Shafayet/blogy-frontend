import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const AddBlog = () => {
  const [loading, setLoading] = useState();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const [pic, setPic] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
    setUser(loggedInUser);
  }, []);

  const picSubmit = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast.error('Please upload a jpeg, jpg, webp or png image!');
      setLoading(false);
      return;
    }

    if (
      pic.type === 'image/jpeg' ||
      pic.type === 'image/png' ||
      pic.type === 'image/webp' ||
      pic.type === 'image/jpg'
    ) {
      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'blogy app');
      data.append('cloud_name', 'djlghivmg');

      fetch('https://api.cloudinary.com/v1_1/djlghivmg/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          toast.success('Image added successfully!');
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast.error('Please upload a jpeg, jpg, webp or png image!');
      setLoading(false);
      return;
    }
  };

  const addData = async () => {
    try {
      const result = await axios.post(
        `https://blogy-backend-sr.vercel.app/posts`,
        {
          userId: user?._id,
          title,
          author,
          desc,
          pic,
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { data, mutateAsync } = useMutation({
    mutationFn: addData,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !desc || !pic) {
      toast.warning('Please fill all the fields!');
      setLoading(false);
      return;
    } else {
      try {
        await mutateAsync();
        toast.success('Blog added successfully!');
        setLoading(false);
      } catch (error) {
        console.error('Error creating new post:', error);
        toast.warning('Failed To Create new post!');
        setLoading(false);
      }
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-bold text-xl md:text-5xl mb-12">
          Add New Post
        </h2>
        <form
          className="max-w-[900px] black-shadow mx-auto py-12 px-8 md:px-12 rounded-xl"
          onSubmit={handleSubmit}
        >
          {/* title */}
          <div className=" flex flex-col gap-y-3 w-full">
            <label htmlFor="title" className="form-label">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Your Blog Title"
              name="title"
              className="input-with-shadow"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* author */}
          <div className=" flex flex-col gap-y-3 w-full mt-6">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              placeholder="Author Name"
              name="author"
              className="input-with-shadow"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {/* description */}
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea
              type="number"
              placeholder="Enter your blog details"
              name="desc"
              className="input-with-shadow"
              rows="4"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          {/* featured image */}
          <div className="flex flex-col gap-4 mt-6">
            <label htmlFor="featured_image" className="form-label">
              Featured Image
            </label>
            <input
              type="file"
              name="featured_image"
              accept="image/*"
              required
              onChange={(e) => picSubmit(e.target.files[0])}
            />
          </div>

          <div className="mt-12">
            <button
              className={`bg-black text-white font-base uppercase font-bold py-3 px-12 hover:translate-y-2 duration-500 rounded cursor-pointer ${
                loading && 'cursor-not-allowed'
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader type="sync" size={11} /> : 'Add New Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
