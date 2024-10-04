import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { deleteProjectApi, getUserProjectApi } from '../services/allApi'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import { toast } from 'react-toastify'

function MyProject() {

    const [userProject, setuserProject] = useState([]);

    const{addProjectResponse , setAddProjectResponse}=useContext(addProjectResponseContext)
    const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)
    const getUserProjects = async () => {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
        const result = await getUserProjectApi(reqHeader);
        setuserProject(result.data)
    }
    useEffect(() => {
        getUserProjects()
    }, [addProjectResponse,editProjectResponse])
    
    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
        const result = await deleteProjectApi(id, reqHeader)
        console.log(result);
        if (result.status === 200) {
            toast.success("successfull deleted")
            getUserProjects()
        }
        else {
            toast.error("something went wrong")
        }
        
    }
  return (
      <>
          <div className='shadow p-5 mb-5'>
              <div className='d-flex mt-4'>
                  <h5 className='text-success me-auto'> MY Projects</h5>
                  <AddProject />
                  
              </div>
                  {
                  userProject?.length > 0 ?
                      userProject.map((item) => (
                        <div>
                        <div className='p-3 mt-4 rounded-2 d-flex' style={{ backgroundColor: "lightgray" }}>
                                  <h5>{ item.title}</h5>
                <div className='d-flex ms-auto align-items-center'>
                                      <EditProject project={ item } />
                    <Link className='ms-3 text-success' to={item.website} target='_blank'>
                        <FontAwesomeIcon icon={faLink} color='primary' size='lg'/>
                    </Link>
                    <Link className='ms-3 text-success' to={item.github} target='_blank'>
                        <FontAwesomeIcon icon={faGithub} color='black' size='lg'/>
                                      </Link>
                                      <button style={{ border: 'none', background: 'transparent' }} onClick={()=>handleDelete(item._id)} className='btn ms-3'>
                                              <FontAwesomeIcon icon={faTrash} color='red' size='lg' />
                                      </button>
                                      
                                      
                </div>
                    </div>
                    
                </div> 
                      )) :
                      <p>no project found</p>
                }
                 
              
          </div>
      </>
  )
}

export default MyProject