import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col ,Row } from 'react-bootstrap'
import { Await, Link } from 'react-router-dom'
import home_image from '../assets/image1.jpeg'
import ProjectCard from '../components/ProjectCard'
import { getHomeProject } from '../services/allApi'

function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [homeProject, setHomeProject] = useState([])
  
  const getHomeProjectItems = async () => {
    const  result  = await getHomeProject();
    setHomeProject(result.data)
    console.log(result.data);
    
    
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)

    }
    getHomeProjectItems();
  },[])
  
  
  return (
    <>
      <div className='container-fluid bg-success p-4 mb-4 w-full vh-100 mb-4  px-5'>
        <Row>
          <Col md={6} className='d-flex justify-content-center flex-column'>
            <div>
              <h1 className='text-light'>Project Fair</h1>
              <h6>one stop destination for may software projects</h6>
            </div>
            {
              isLogin ?
              <Link to={'/dashboard'}>
              <button className='btn btn-warning text-black border-xl border-black my-4'><FontAwesomeIcon icon={faArrowRight} />    MANAGE PROJECT</button>
                </Link> :
                <Link to={'/login'} >
                <button className='btn btn-warning text-black border-xl border-black my-4'><FontAwesomeIcon icon={faArrowRight} />    GET STARTED</button>
                </Link>
            }
            
            
              
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column mt-5'>
            <img src={home_image} alt="" width={500} height={400}/>
          </Col>
        </Row>
      </div>
      <div className='container-fluid mb-5'>
        <h2 className='text-center my-5'>Explore Our Project</h2>
        <marquee scrollamount={20}>
          <div className='row' >
            {
              homeProject?.length > 0 ?
                homeProject.map((item) => (
                  
                  <div className='col-md-4 justify-content-center d-flex p-4 '>
                    <ProjectCard project={ item } />
                </div>
                )) :
                <p>no project founded</p>
            }
          
        </div>
        </marquee>
        
        <Link to={'/project'} className='text-primary' style={{textDecoration:"none"}}>
          <h5 className='text-center'>See more Project</h5>
        </Link>
      </div>
    </>
  )
}

export default Home