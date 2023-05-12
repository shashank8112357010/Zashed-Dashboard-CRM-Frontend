import React, { useState } from 'react'
import { getClientUser } from '../services/services';
import { useEffect } from 'react';

const UploadBrand = () => {
    const [dropDownHeading, setDropDownHeading] = useState('Select');
    const [dropDownToggle, setDropDownToggle] = useState(false);
    const [userDetails, setUserDetails] = useState([])

    const getUserDetails = () => {
        getClientUser().then((res) => {
            console.log(res);
            setUserDetails(res.data.results)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">Upload Brands</h4>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle p-2" onClick={() => setDropDownToggle(!dropDownToggle)} style={{ minWidth: "120px" }} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        {dropDownHeading}
                                    </button>
                                    <ul className={`dropdown-menu  ${dropDownToggle && 'show'}`} aria-labelledby="dropdownMenuLink">
                                        <li className='dropdown-item cursor-pointer' onClick={() => { setDropDownHeading('Upload new Brands'); setDropDownToggle(false) }} >Upload new Brands</li>
                                        <li className='dropdown-item cursor-pointer' onClick={() => { setDropDownHeading('Update Existing one'); setDropDownToggle(false) }} >Update Existing one</li>
                                    </ul>
                                </div>
                            </div>


                        </div>
                    </div>
                    {/* Upload brand UI */}
                    {
                        dropDownHeading === 'Upload new Brands' ?

                            <div className='row d-flex justify-content-center mt-5 '>
                                <div className='col-6 p-4 card bg-success'>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-6'>
                                            <label className='text-white fs-12'>Brand Name</label> <input className='form-control' />
                                            </div>
                                            <div className='col-6'>
                                            <label className='text-muted fs-12'>User Name</label>  <button className='btn btn-primary form-control'>User</button>
                                            </div>

                                           
                                        </div>
                                        <div className='mt-3'>
                                            <label className='text-muted fs-12'>Upload Brand</label> <input className='form-control' type='file' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            :
                            dropDownHeading === 'Update Existing one' ?
                                <h1>Hello</h1>
                                : ""


                    }


                </div>
            </div>


        </div>
    )
}

export default UploadBrand