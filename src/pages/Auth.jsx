import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowRotateBack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
function Auth({ register }) {
  const registerForm = register ? true : false
  //useNavigate() is used to redirect to a parictular path
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  })
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password ) {
      toast.warning("please fill the form completely",{theme:'colored'})
    }
    else {
      const result = await registerApi(userData)
    
      
      if (result.status === 201) {
        //toastify implement
        setUserData({
          username: "",
          email: "",
          password: "",
        })
        
        toast.success(`${username} register succefully`)
        //navigate to login page on successfull user registration
        navigate('/login')
      }
      else if (result.status == 400) {
        toast.error(result.response.data,{theme:'colored'})
        navigate('/login')
      }

      else {
        toast.error("something happenend",{theme:'colored'})
      }
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password ) {
      toast.warning("please fill the form completely",{theme:'colored'})
    }
    else {
      const result = await loginApi(userData);
      console.log("login result");
      console.log(result);
      if (result.status === 200) {
        sessionStorage.setItem("loggedUser", JSON.stringify(result.data.data))
        sessionStorage.setItem("token", result.data.token)
        toast.success("login is success",{theme:'colored'})
        navigate('/')
      }
      else if(result.status === 401){

        toast.error("invalid email or password",{theme:'colored'})
      }
      else {
        toast.error("something went wrong",{theme:'colored'})
      }
    }
  }
  return (
    <>
      <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className='container w-75'>
          <h4 >
              <Link to={'/'} className='text-warning' style={{textDecoration:"none",fontWeight:"bolder"}}> <FontAwesomeIcon icon={faArrowRotateBack}/> Back to Home</Link>
          </h4>
          <div>
            <Row>
              <Col md={6} className='p-4 d-flex justify-content-center align-items-center'>
                <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" width={500} height={500} alt=""
                />
              </Col>
              <Col md={6} className='p-5 d-flex justify-content-center '>
                <form  className='w-100'>
                  <h5 className='text-center'><FontAwesomeIcon icon={faStackOverflow} /> Project Fair</h5>
                  {registerForm ?
                    <>
                    <h6 className='text-center mb-3 mt-3'> Sign up to your account</h6>
                      <input type="text" placeholder='Name' className='form-control rounded'
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username:e.target.value})}/>
                      </>
                    : 
                    <h6 className='text-center mb-3 mt-3'>Sign in to your account</h6>
                  }
                  <div className='mb-3 mt-3'>
                    <input type="text" placeholder='Email id' className='form-control rounded'
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email:e.target.value})}/>
                  </div>
                  <div>
                    <input type="text" placeholder='password' className='form-control rounded'
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password:e.target.value})}/>
                  </div>
                  {registerForm ? 
                    <div>
                      <button className='btn btn-warning mt-3 rounded w-100' onClick={handleRegister}>REGISTER</button>
                      <p className='mt-3'>already a user ? click here to <Link to={"/login"} className='ms-2' style={{textDecoration:"none"}}>LOGIN</Link></p>
                    </div> :
                    <div>
                      <button className='btn btn-warning mt-3 rounded w-100' onClick={handleLogin}> LOGIN</button>
                      <p className='mt-3'>Not registered yet ? click here to <Link to={"/register"} className='ms-2' style={{textDecoration:"none"}}>Register</Link></p>

                    </div>
                }
                  
                </form>
              </Col>
            </Row>
          </div>

        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  )
}

export default Auth