import React from 'react'
import Card from 'react-bootstrap/Card';
import mediaplayer from '../assets/image2.jpeg'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
      <>
          <Card style={{ width: '100%' }} onClick={handleShow}>
          <Card.Img variant="top" src={`${BASE_URL}/uploads/${project.projectImage}`}  height="200px"/>
      <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
      
        
      </Card.Body>
          </Card>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>media player</Modal.Title>
       </Modal.Header>
              <Modal.Body>
                  <Row>
                      <Col md={6}>
                          <img src={`${BASE_URL}/uploads/${project.projectImage}`}  width = "100%"  />
                      </Col>
                      <Col md={6}>
                          <h4>description:</h4>
                          <p>{ project.overview}</p>
                          <h4>Technologies:</h4>
                          <p>{project.language }</p>
                      </Col>
                  </Row>
              </Modal.Body>
              <div className='d-flex mt-3 ms-3 mb-4'>
                   <Link className='me-3 ms-5' to={project.github} target='_blank'>
                      <FontAwesomeIcon icon={faGithub} size='2xl' color='black'/>
                      
                  </Link>
                  <Link to={project.website} target='_blank'>
                  <FontAwesomeIcon icon={faLink} size='2xl' color='black'/>
                  </Link>
              </div>
      </Modal>
            
      </>
  )
}

export default ProjectCard