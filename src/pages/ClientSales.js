import React from 'react'
import CommingSoon from '../common/CommingSoon'
import { Link } from 'react-router-dom'
import "./pages.css"

const ClientSales = () => {
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">Client </h4>


                                <div className='col-sm-2  text-center'>
                                    <span href='#' className='font-size-15 text-white border p-2 border-dark rounded-pill bg-primary'>Brand Name</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <CommingSoon/> */}
                    {/* start */}
                    <div className='row d-flex justify-content-between align-items-center'>
                        <div className='col-sm-6'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">Total Revenue</p>
                                            <h4 className="mb-0">1,235</h4>
                                        </div>
                                        <div className="flex-shrink-0 align-self-center ">
                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                <span className="avatar-title rounded-circle bg-primary">
                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-6'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">Profit</p>
                                            <h4 className="mb-0">1,235</h4>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center ">
                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                <span className="avatar-title rounded-circle        bg-primary">
                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className='row d-flex justify-content-between align-items-center'>


                        <div className='col-sm-6'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">Orders</p>
                                            <h4 className="mb-0">1,235</h4>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center ">
                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                <span className="avatar-title rounded-circle bg-primary">
                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-6'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">Revenue overview</p>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center ">
                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                <span className="avatar-title rounded-circle        bg-primary">
                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>




                    <div className='row d-flex justify-content-between align-items-center'>


                        <div className='col-sm-6'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">Return</p>
                                            <h4 className="mb-0">1,235</h4>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center ">
                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                <span className="avatar-title rounded-circle bg-primary">
                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-sm-6'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">pie chart</p>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center ">
                                            <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                <span className="avatar-title rounded-circle        bg-primary">
                                                    <i className="bx bx-archive-in font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                {/* <!-- end row --> */}
            </div>
        </div>



    )
}

export default ClientSales