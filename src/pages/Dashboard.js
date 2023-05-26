import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* <!-- start page title --> */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0 font-size-18">Dashboard</h4>



                            </div>
                        </div>
                    </div>
                    {/* <!-- end page title --> */}
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">Total Revenue</p>
                                            <h4 className="mb-0">1,235</h4>
                                            
                                        </div>

                                        <div className="flex-shrink-0 align-self-center">
                                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                                <span className="avatar-title">
                                                    <i className="bx bx-copy-alt font-size-24"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">Zashed Commission</p>
                                            <h4 className="mb-0">$35, 723</h4>
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
                        <div className="col-md-4">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">Target & Actual Achievements</p>
                                            <progress className='w-75 mt-2'  value="32" max="100" ></progress>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row text-center mt-2'>
                        <h4>Performance Graph</h4>
                    </div>
                    {/* <!-- end row --> */}
                    {/* <!-- end row --> */}
                </div>
                {/* <!-- container-fluid --> */}
            </div>


        </div>
    )
}

export default Dashboard;