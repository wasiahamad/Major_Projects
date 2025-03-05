import React, { useState } from 'react' // Import React and useState hook
import { Link } from 'react-router-dom' // Import Link component from react-router-dom
import { useNavigate } from 'react-router-dom' // Import useNavigate hook from react-router-dom
import axios from 'axios' // Import axios for making HTTP requests
import { CaptainDataContext } from '../context/CaptainContext' // Import CaptainDataContext

const Captainlogin = () => {

  const [ email, setEmail ] = useState('') // State for email input
  const [ password, setPassword ] = useState('') // State for password input

  const { captain, setCaptain } = React.useContext(CaptainDataContext) // Use CaptainDataContext
  const navigate = useNavigate() // Initialize navigate function

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const captain = {
      email: email,
      password
    }

    // Send POST request to login captain
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data

      setCaptain(data.captain) // Set captain data in context
      localStorage.setItem('token', data.token) // Store token in localStorage
      navigate('/captain-home') // Navigate to captain home page
    }

    // Reset form inputs
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://cdn3.rallybound.com/content/images/img/28988/logo-header.png" alt="" /> {/* Logo */}

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          {/* Form fields */}
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
          >Login</button>
        </form>
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin