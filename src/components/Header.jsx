import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate,  } from 'react-router-dom';
import { toast } from 'react-toastify';


function Header() {

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
    if (sessionStorage.getItem('token')){
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('loggedUser')
    }
    else {
      toast.warning("your are already logout")
    }
  }
  return (
    
    <>
      <Navbar className="bg-success">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:"none"}} className='text-light'>
          <FontAwesomeIcon icon={faStackOverflow} style={{textDecoration:'none',color:'orange'}} className='me-2'/>
            Project Fair
            </Link>
          </Navbar.Brand>
          <button  className='btn btn-warning' onClick={handleLogout} ><FontAwesomeIcon icon={faPowerOff} />  Logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header