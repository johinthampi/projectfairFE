import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { Link } from 'react-router-dom'
import { faFacebook, faInstagram, faTwitter, faGithub, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
      <div>
          <div className='d-flex justify-content-center align-items-center bg-success p-3'>
      <div className='footer d-flex align-items-center justify-content-evenly'>
        <div style={{width:"400px"}}>
          <h5 style={{color:"orange"}}><FontAwesomeIcon icon={faStackOverflow} style={{textDecoration:'none',color:'orange'}}/> project fair</h5>
          <p style={{textAlign:"justify"}} className= "textstyle" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sapiente, animi dolore doloremque officia eveniet nostrum, reiciendis, sit ab vel modi. Est quae praesentium soluta a? Atque nobis vel debitis!</p>
        </div>
        <div className='d-flex flex-column ms-3'>
          <h4 className= "textstyle">Links</h4>
          <Link to = '/' style={{textDecoration:'none',color:"black"}}>
          home
          </Link>
          <Link to ='/dashboard' style={{textDecoration:'none',color:"black"}}>
          dashboard
          </Link>
          <Link to='/project' style={{textDecoration:'none',color:"black"}}>
          projects
          </Link>
        </div>
        <div className='d-flex flex-column ms-3' >
          <h4 className= "textstyle">Guides</h4>
          <Link to = 'https://react.dev' target='_blank' style={{textDecoration:'none',color:"white"}}>
          React
          </Link>
          <Link to ='https://react-bootstrap.netlify.app' target='_blank' style={{textDecoration:'none',color:"white"}}>
          React Bootstrap
          </Link>
          <Link to='https://www.npmjs.com/package/json-server' target='_blank' style={{textDecoration:'none',color:"white"}}>
          Json server
          </Link>
        </div >
        <div className= "ms-5">
          <h4 className='textstyle'>Constact US</h4>
          <div className='d-flex'> 
            <input type="text" placeholder='enter your email' className='form-control'/>
            <button className='btn btn-warning ms-2'>subscribe</button>
            </div>
            <div className='d-flex justify-content-evenly align-items-centerv mt-3'>
            <Link to = 'https://facebook.com' target='_blank' style={{color:"black"}}>
            <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link to = 'https://instagram.com' target='_blank' style={{color:"black"}}>
            <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link to = 'https://twitter.com' target='_blank' style={{color:"black"}}>
            <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link to = 'https://github.com' target='_blank' style={{color:"black"}}>
            <FontAwesomeIcon icon={faGithub} />
            </Link>
            </div>

          
        </div>
      </div>
      
      
    </div>
    </div>
  )
}

export default Footer