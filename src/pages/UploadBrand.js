import React, { useState } from 'react'
import { createBrand, getClientUser, updateExistingBrand } from '../services/services';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Toast from '../common/Toast';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { getBrands } from '../services/services';

const UploadBrand = () => {

    const [show, setShow] = useState(false);
    const [showUpdateBrand, setShowUpdateBrand] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdateBrandShow = () => setShowUpdateBrand(true)
    const handleUpdateBrandHide = () => setShowUpdateBrand(false)


    const [brandData, setBrandData] = useState()
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
    const [updateBrand, setUpdateBrands] = useState({
        brand_name: null,
        file: null
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

    const fetchBrands = () => {
        getBrands().then((res) => {
            setBrandData(res.data.results)
        }).catch((err) => console.log(err))
    }

    const handleUpdateBrand = () => {
        const brandId = brandData.filter((item) => item.name === updateBrand.brand_name)
        const [obj] = brandId
        let formData = new FormData()
        formData.append('file', updateBrand?.file)
        formData.append('brand_id', obj?.id);
        updateExistingBrand(formData).then((res) => {
            Toast(false, "Updated successfully");
            handleUpdateBrandHide()
        }).catch((err) => {
            console.log("something went wrong ");
        })

    }
    useEffect(() => {
        fetchBrands();
        getUserDetails()
    }, [])

    return (
        <div className="main-content">
            <div className="page-content" style={{ height: '100vh' }}>
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">Upload Brands</h4>
                                <Dropdown className='me-4'>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        Choose Options
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleShow}>Create Brand</Dropdown.Item>
                                        <Dropdown.Item onClick={handleUpdateBrandShow}>Upload Existing</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>


                        </div>
                    </div>

                    {/* create brand modal  */}
                    <Modal show={show} onHide={handleClose} 
                     backdrop="static"
                     keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Create Brand</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label className='text-muted fs-12'>Brand Name</label>
                                        <input className='form-control' placeholder='Type brand name' id="brand_name" onChange={(e) => handleCreateBrand(e)} />
                                    </div>
                                    <div className='col-6'>
                                        <label className='text-muted fs-12'>Select User</label>
                                        <div className="dropdown">
                                            <button className="btn btn-dropdown-toggle px-5" onClick={() => setUserDrop((prev) => ({ ...prev, toggle: !dropDownToggle.toggle }))} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {openUserDrop.heading}
                                            </button>
                                            <div className={` dropdown-menu ${openUserDrop.toggle && 'show d-block'}`} aria-labelledby="dropdownMenuButton"
                                            >
                                                {
                                                    userDetails.map((item) => {
                                                        return (
                                                            <span id='user_id' onClick={(e) => { setUserDrop({ toggle: false, heading: item.User.username }); handleCreateBrand(e, item) }} className="dropdown-item cursor-pointer">{item.User.username}</span>
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

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handelCreateBrandSubmit} >
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* create brand modal ends */}

                    {/* update brand modal starts */}
                    <Modal show={showUpdateBrand} onHide={handleUpdateBrandHide} 
                     backdrop="static"
                     keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Update Existing Brand</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='row px-3'>
                                <label className='text-muted fs-12'>Choose Brand</label>
                                <Form.Select aria-label="Default select example" onClick={(e) => setUpdateBrands((prev) => ({ ...prev, brand_name: e.target.value }))}>
                                    {
                                        brandData && brandData?.map((brand) => {
                                            {
                                                console.log(brand);
                                            }
                                            return (
                                                <option value={brand.name}>{brand.name}</option>
                                            )
                                        })

                                    }


                                </Form.Select>


                            </div>
                            <div className='mt-3'>
                                <label className='text-muted fs-12'>Upload Brand</label> <input className='form-control' id="brand-sheet" type='file' onChange={(e) => setUpdateBrands((prev) => ({ ...prev, file: e.target.files[0] }))} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleUpdateBrandHide}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleUpdateBrand}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* update brand modal ends */}



                    {/* table  */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Brand Name</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                brandData && brandData.map((brand) => {
                                    return (
                                        <tr>
                                            <td>{brand?.id}</td>
                                            <td>{brand?.name}</td>
                                            <td>{brand?.createdAt.slice(0, 10)}</td>
                                            <td>{brand?.updatedAt.slice(0, 10)}</td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </Table>
























                </div>
            </div>
        </div>
    )
}

export default UploadBrand