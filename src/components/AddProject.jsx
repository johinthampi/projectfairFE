import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProject() {
        const [show, setShow] = useState(false);
  const [token, setToken] = useState("");
  //useContext() hook is used to access state created inside contentshare
  const { setAddProjectResponse}= useContext(addProjectResponseContext)

  useEffect(() => {
    if (sessionStorage.getItem("token")){
      
      setToken(sessionStorage.getItem("token"))
    }
  }, [])
  
        const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: "",
  })
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (projectDetails.projectImage) {
      //to create image url for preview URL.createObjectURL("image value")
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])
  
  const handleAddProject = async (e) => {
    e.preventDefault();
    const { title, language, github, website, overview, projectImage } = projectDetails;
    
    if (!title || !language || !github || !website || !overview || !projectImage) {
      toast.error("please fill the form completely")
    }
    else {
      //here we are also uploading a file, so we should sent body in the form of formData
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage", projectImage)
      
      // here content type we are passing is multipart form data so specifi req header needed 
      const reqHeader = {
        'Content-Type': 'multpart/form-date',
        "Authorization":`Bearer ${token}`
      }
      const result = await addProjectApi(reqBody, reqHeader)
      if (result.status === 200) {
        setAddProjectResponse(result.data)
        toast.success(`${title} upload successfull`);
        setProjectDetails({
          title: "",
          language: "",
           github: "",
           website: "",
          overview: "",
            projectImage: "",
        })
        setPreview("")
        handleClose()
      }
      else if(result.status === 409){
        toast.warning(`${title} already existing`)
      }
      else {
        toast.error(`${title} upload failed`)
      }
    }
  }
  const handleClose1 = () => {
    handleClose();
    setPreview("")
    setProjectDetails({
      title: "",
      language: "",
       github: "",
       website: "",
      overview: "",
        projectImage: "",
    })
    }
  return (
      <>
          <button className='btn btn-success' onClick={handleShow}>Add Project</button>

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
                 onChange={(e)=> setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}
                />
                <img src={preview?preview:"https://imgs.search.brave.com/VSLi9jSoG-pn_vdjTbeywhjH7vIJLtle5wtWJGKkeCo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly95b3Vy/aW1hZ2VzaGFyZS5j/b20vaW1hZ2VzL3Nl/Y3Rpb25zL3VwbG9h/ZC5zdmc" }
                              width={200}    alt="" />
                          </label>
                      </div>
                      <div className='col-md-6' >
                          
              <input type="text" placeholder='Project Title' className='form-control mb-3'
              value={projectDetails.title} onChange={(e)=> setProjectDetails({...projectDetails,title:e.target.value})}/>
              <input type="text" placeholder='lauguages used' className='form-control mb-3'
              value={projectDetails.language} onChange={(e)=> setProjectDetails({...projectDetails,language:e.target.value})}/>
              <input type="text" placeholder='github ' className='form-control mb-3'
              value={projectDetails.github} onChange={(e)=> setProjectDetails({...projectDetails,github:e.target.value})}/>
              <input type="text" placeholder='website ' className='form-control mb-3'
              value={projectDetails.website} onChange={(e)=> setProjectDetails({...projectDetails,website:e.target.value})}/>
              <textarea placeholder='Project overview' rows={4} className='form-control mb-3'
              value={projectDetails.overview} onChange={(e)=> setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
                          
                      </div>
                  </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddProject}>
           Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
      </>
  )
}

export default AddProject