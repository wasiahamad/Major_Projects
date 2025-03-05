import React, { useState, useContext } from 'react'; // Import necessary hooks and libraries
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { UserDataContext } from '../context/UserContext'; // Import UserDataContext for managing user data
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'; // Import axios for making HTTP requests

const UserLogin = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [message, setMessage] = useState(''); // State for success/error messages

  const { user, setUser } = useContext(UserDataContext); // Use context to get and set user data
  const navigate = useNavigate(); // Hook for navigation

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make API call to login user
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user); // Set user data in context
        localStorage.setItem('token', data.token); // Store token in local storage
        setMessage('Login successful! Check your email for notification.'); // Success message
        navigate('/home'); // Navigate to home page
      }

      setEmail(''); // Reset email state
      setPassword(''); // Reset password state
    } catch (error) {
      // If there's an error, show the error message
      setMessage(error.response?.data?.message || 'An error occurred');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-10'
          src="https://cdn3.rallybound.com/content/images/img/28988/logo-header.png"
          alt=""
        /> {/* Logo */}

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >
            Login
          </button>

          {/* Display success/error message */}
          {message && (
            <p className={`text-center ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>

        <p className='text-center'>
          New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link>
        </p>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;