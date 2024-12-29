import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CreateFolder = () => {
  return (
    <div
    className='col-md-12 fade position-fixed top-0 left-0 w-100 h-100'
    style={{ background:"rgba(0,0,0,0.4)" }}>
        <div className='row align-items-center justify-content-center'>
            <div className='col-md-4 mt-5 bg-white p-4'>
                <div className='d-flex justify-content-between'>
                    <h4>Create Folder</h4>
                    <button className='btn'>
                        <FontAwesomeIcon 
                        icon={faTimes}
                        className='text-black'
                        size='sm'
                        />

                    </button>
                </div>
                <hr/>
                <div className='d-flex flex-column align-items-center'>
                    <form className='mt-3 w-100'>
                        <div className='form-group'>
                            <input type="text" 
                            className='form-control'
                            id="folderName" 
                            placeholder='Folder Name'
                            />
                        </div>
                        <button  type="submit" className='btn btn-primary mt-5 form-control'>
                            Create Folder
                            </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateFolder
