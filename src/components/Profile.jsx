import { faAngleDoubleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="shadow p-4">
        <div className="d-flex">
          <h5>Profile</h5>
          <button
            className="ms-auto btn btn-primary"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            )}
          </button>
        </div>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor="profileimg">
                <input type="file" id="profileimg" style={{display:"none"}}/>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" width={180} style={{borderRadius:"50%"}} alt="" />
              </label>

            </div>
            <div>
              <input type="text" placeholder='GitHub Link' className='form-control mt-3 mt-3' />
              <input type="text" placeholder='Linkedin profile' className='form-control mt-3 mt-3' />
              <button className='btn btn-primary w-100'>Update</button>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default Profile