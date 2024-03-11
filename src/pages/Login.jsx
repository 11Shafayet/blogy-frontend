import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addData = async () => {
    try {
      const result = await axios.post(
        `https://blogy-backend-sr.vercel.app/user/login`,
        {
          email,
          password,
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
      toast.success('Login Successful!');
      setLoading(false);
      navigate('/dashboard');
      window.location.reload();
    },
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email && password) {
      try {
        await mutateAsync();
      } catch (error) {
        toast.warning('Failed To Log in!');
        setLoading(false);
      }
    } else {
      toast.warning('Please Fill all the fields!');
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="shadow-xl p-6 md:p-12 rounded-xl min-h-[600px] max-w-[600px] bg-white mx-auto">
          <form
            className="w-full flex flex-col gap-y-4"
            onSubmit={handleLoginSubmit}
          >
            <h3 className="accent-color text-3xl text-center font-bold capitalize my-6">
              Enter your login details
            </h3>
            <input
              type="text"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500 rounded-md"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full min-h-[55px] shadow-light py-2 px-3 leading-6 focus:outline-cyan-500 rounded-md"
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
            <button
              type="submit"
              className={`bg-cyan-500 hover:bg-cyan-600 text-white py-4 px-6 w-full rounded-md uppercase duration-300 leading-none font-bold text-lg ${
                loading && 'cursor-not-allowed opacity-50'
              }`}
            >
              Log In
            </button>
            <button
              type="submit"
              className="bg-rose-500 hover:bg-teal-600 text-white py-4 px-6 w-full rounded-md uppercase duration-300 leading-none font-bold text-lg"
              onClick={() => {
                setEmail('s@gmail.com');
                setPassword('1234');
              }}
            >
              Admin Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
