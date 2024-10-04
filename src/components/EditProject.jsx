import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseurl';
import { editUserProjectApi } from '../services/allApi';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({project}) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("")
  const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)
      
        const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails] = useState({
    id:project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage:""
  })
  const handleUpdate = async (e) => {
    e.preventDefault()
    const { title, language, github, website, overview, projectImage, id } = projectDetails;
    
    if (!title || !language || !github || !website || !overview || !projectImage || !id) {
      alert("please fill the form completely")
    }
    else {
      //here we are also uploading a file, so we should sent body in the form of formData
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      preview ? reqBody.append("projectImage", projectImage) :
        reqBody.append("projectImage", project.projectImage)
      const token = sessionStorage.getItem("token");
      if (preview) {
        const reqHeader = {
          'Content-Type': 'multpart/form-data',
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectApi(id, reqBody, reqHeader);
        console.log(result);
        if (result.status === 200) {
          handleClose()
          setEditProjectResponse(result)
        }
      }
      else {
        const reqHeader = {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectApi(id, reqBody, reqHeader);
        console.log(result);
        if (result.status === 200) {
          handleClose()
          setEditProjectResponse(result)
        }
        
      }
    }
  }
    useEffect(() => {
      if (projectDetails.projectImage) {
        //it will show only preview of upload the image
        setPreview(URL.createObjectURL(projectDetails.projectImage))
      }
    }, [projectDetails.projectImage])
  
  const handleClose1 = () => {
    handleClose();
    setProjectDetails({
      id:project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
      projectImage: ""
    })
    setPreview("")
  }
  
  
  return (
      <>
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow}/>
          <Modal show={show} onHide={handleClose} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title>ADD PROJECT</Modal.Title>
        </Modal.Header>
              <Modal.Body>
                  <div className='row'>
                      <div className='col-md-6'>
                          {/* in clicking in image also file need to open htmlFor & id are same*/}
                          <label htmlFor="projectimage">
                <input type="file" style={{ display: "none" }} id='projectimage'
                onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                              <img src={preview?preview:`${BASE_URL}/uploads/${project?.projectImage}`}
                              width={200}    alt="" />
                          </label>
                      </div>
                      <div className='col-md-6' >
                          
              <input type="text" placeholder='Project Title' className='form-control mb-3' value={projectDetails.title}
              onChange={(e)=>setProjectDetails({...projectDetails, title:e.target.value})}/>
              <input type="text" placeholder='lauguages used' className='form-control mb-3' value={projectDetails.language}
              onChange={(e)=>setProjectDetails({...projectDetails, language:e.target.value})}/>
              <input type="text" placeholder='github ' className='form-control mb-3' value={projectDetails.github}
              onChange={(e)=>setProjectDetails({...projectDetails, github:e.target.value})}/>
              <input type="text" placeholder='website ' className='form-control mb-3' value={projectDetails.website}
              onChange={(e)=>setProjectDetails({...projectDetails, website:e.target.value})}/>
              <textarea placeholder='Project overview' rows={4} className='form-control mb-3' value={projectDetails.overview}
              onChange={(e)=>setProjectDetails({...projectDetails, overview:e.target.value})}></textarea>
                      </div>
                  </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
           Update
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default EditProject