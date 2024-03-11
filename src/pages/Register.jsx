import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Loader from '../components/common/Loader';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const navigate = useNavigate();

  const picSubmit = (pic) => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      if (
        pic.type === 'image/jpeg' ||
        pic.type === 'image/png' ||
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
            console.log(data);
            setPic(data.url.toString());
            console.log(pic);
            console.log(data.url.toString());
            setLoading(false);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            reject(err);
          });
      } else {
        toast.error('Please upload a jpeg, jpg, or png image!');
        setLoading(false);
        reject('Invalid image type');
      }
    });
  };

  const addData = async () => {
    try {
      console.log(pic);
      const result = await axios.post(
        `https://blogy-backend-sr.vercel.app/user`,
        {
          name,
          email,
          password,
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
    onSuccess: (data) => {
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      toast.success('Register Successful!');
      setLoading(false);
      navigate('/');
      window.location.reload();
    },
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !conPassword) {
      toast.warning('Please fill all the fields!');
      setLoading(false);
      return;
    } else {
      if (password !== conPassword) {
        toast.warning("Password Doesn't match!");
        setLoading(false);
        return;
      } else {
        try {
          await mutateAsync();
        } catch (error) {
          toast.warning('Failed To Create User!');
          setLoading(false);
        }
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="shadow-xl p-6 md:p-12 rounded-xl min-h-[600px] max-w-[600px] bg-white mx-auto">
          <form
            className="w-full flex flex-col gap-y-4"
            onSubmit={handleRegisterSubmit}
          >
            <h3 className="accent-color text-3xl text-center font-bold capitalize my-4">
              Register with your details
            </h3>
            {/* name */}
            <input
              type="text"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500"
            />
            {/* email */}
            <input
              type="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500"
            />
            {/* password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500"
              />
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-cyan-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </div>
            </div>
            {/* confirm password */}
            <div className="relative">
              <input
                type={showConPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                required
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500"
              />
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer hover:text-cyan-500"
                onClick={() => setShowConPassword((prev) => !prev)}
              >
                {showConPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </div>
            </div>
            {/* image */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => picSubmit(e.target.files[0])}
            />
            <button
              type="submit"
              className={`bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-6 w-full rounded-md uppercase duration-300 leading-none font-bold text-lg ${
                loading && 'cursor-not-allowed opacity-50'
              }`}
              disabled={loading}
            >
              {!loading ? 'REGISTER NOW' : <Loader type="sync" size={11} />}
            </button>
          </form>
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
        </div>
      </div>
    </section>
  );
};

export default Register;
