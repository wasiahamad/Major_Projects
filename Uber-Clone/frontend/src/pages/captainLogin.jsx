import React, {useState} from "react"
import { Link } from "react-router-dom"

const captainLogin = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({})


  const submitHandler = async (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password
    })

    // console.log(userData)

    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb-3" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form onSubmit={(e) => {
          submitHandler(e);
        }} >
          <h3 className="text-lg font-medium mb-2">What`s your Email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="email@example.com"
            required
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            required
          />

          <button
            className="bg-[#10b461] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text"
          >
            Login
          </button>
        </form>
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Ragister as a Captain</Link></p>
      </div >

      <div>
        <Link
          to="/login"
          className="bg-[#111] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text"
        >
          Sign in as User
        </Link>
      </div>
    </div >
  )
}

export default captainLogin
