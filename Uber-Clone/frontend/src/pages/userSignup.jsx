import React, { useState, useContext } from 'react' // Import necessary hooks and libraries
import { Link, useNavigate } from 'react-router-dom' // Import Link and useNavigate from react-router-dom
import axios from 'axios' // Import axios for making HTTP requests
import { UserDataContext } from '../context/UserContext' // Import UserDataContext for managing user data

const UserSignup = () => {
  const [ email, setEmail ] = useState('') // State for email
  const [ password, setPassword ] = useState('') // State for password
  const [ firstName, setFirstName ] = useState('') // State for first name
  const [ lastName, setLastName ] = useState('') // State for last name
  const [ userData, setUserData ] = useState({}) // State for user data

  const navigate = useNavigate() // Hook for navigation

  const { user, setUser } = useContext(UserDataContext) // Use context to get and set user data

  const submitHandler = async (e) => {
    e.preventDefault() // Prevent default form submission
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser) // Make API call to register user

    if (response.status === 201) {
      const data = response.data
      setUser(data.user) // Set user data in context
      localStorage.setItem('token', data.token) // Store token in local storage
      navigate('/home') // Navigate to home page
    }

    setEmail('') // Reset email state
    setFirstName('') // Reset first name state
    setLastName('') // Reset last name state
    setPassword('') // Reset password state
  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="https://cdn3.rallybound.com/content/images/img/28988/logo-header.png" alt="" /> {/* Logo */}

          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='password'
            />

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

          </form>
          <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div >
  )
}

export default UserSignup