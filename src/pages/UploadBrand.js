import React, { useState } from 'react'
import { createBrand, getClientUser } from '../services/services';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Toast from '../common/Toast';

const UploadBrand = () => {
    const [dropDownHeading, setDropDownHeading] = useState('Select');
    const [dropDownToggle, setDropDownToggle] = useState(false);
    const [openUserDrop, setUserDrop] = useState({
        toggle: false,
        heading: "Select User"
    })
    const [userDetails, setUserDetails] = useState([]);
    const [createFormData, setCreateFormData] = useState({
        file: null,
        name: null,
        user_id: null

    })
    const getUserDetails = () => {
        getClientUser().then((res) => {
            setUserDetails(res.data.results)
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleCreateBrand = (e, userid) => {
        const { value, id } = e.target;
        switch (id) {
            case 'brand_name':
                setCreateFormData((prev) => ({ ...prev, name: value }))
                break;
            case 'user_id':
                const { user_id } = userid
                setCreateFormData((prev) => ({ ...prev, user_id: user_id }))
                break;
            case 'brand-sheet':
                setCreateFormData((prev) => ({ ...prev, file: e?.target?.files[0] }))
                break;
        }
    }
    const validateBrand = () => {
        if (createFormData.name === null) {
            Toast(true, "Please fill brand name")
            return false
        }
        else if (createFormData.user_id === null) {
            Toast(true, "Please select user")
            return false
        }
        else if (createFormData.file === null) {
            Toast(true, "Please select file")
            return false
        } else {
            return true
        }
    }
    const handelCreateBrandSubmit = (e) => {
        e.preventDefault();
        if (validateBrand()) {
            let formData = new FormData()
            formData.append('file', createFormData.file)
            formData.append('user_id', createFormData.user_id)
            formData.append('name', createFormData.name)
            setDropDownHeading("Select")
            createBrand(formData).then((res) => {
            }).catch((err) => {
                console.log(err);
            })
        }

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
                                    <button className="btn btn-secondary dropdown-toggle p-1" onClick={() => setDropDownToggle(!dropDownToggle)} style={{ minWidth: "120px" }} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
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
                                <div className='col-6 p-4 card '>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <label className='text-muted fs-12'>Brand Name</label>
                                                <input className='form-control' placeholder='Type brand name' id="brand_name" onChange={(e) => handleCreateBrand(e)} />
                                            </div>
                                            <div className='col-6'>
                                                <label className='text-muted fs-12'>User Name</label>
                                                <div class="dropdown">
                                                    <button class="btn btn- dropdown-toggle px-5" onClick={() => setUserDrop((prev) => ({ ...prev, toggle: !dropDownToggle.toggle }))} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {openUserDrop.heading}
                                                    </button>
                                                    <div class={` dropdown-menu ${openUserDrop.toggle && 'show d-block'}`} aria-labelledby="dropdownMenuButton"
                                                    >
                                                        {
                                                            userDetails.map((item) => {
                                                                return (

                                                                    <span id='user_id' onClick={(e) => { setUserDrop({ toggle: false, heading: item.User.username }); handleCreateBrand(e, item) }} class="dropdown-item cursor-pointer">{item.User.username}</span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-3'>
                                            <label className='text-muted fs-12'>Upload Brand</label> <input className='form-control' id="brand-sheet" type='file' onChange={(e) => handleCreateBrand(e)} />
                                        </div>
                                        <div className='row p-2 mt-4'>
                                            <div className='col-6'><button className='btn btn-md btn-danger'>cancel</button></div>
                                            <div className='col-6 d-flex justify-content-end'><button className='btn btn-md btn-primary' onClick={handelCreateBrandSubmit}>Create Brand</button></div>
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