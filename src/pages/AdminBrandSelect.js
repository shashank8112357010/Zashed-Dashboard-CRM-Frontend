import React from 'react'

const AdminBrandSelect = ({
    branddata
}) => {
    console.log(branddata);
    const brandDetails = branddata?.brand_data?.map((item)=>item)
    return (
        <>
            <div className='row'>
                <div className='col-sm-4'>
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Total Revenue</p>
                                    <h4 className="mb-3">{ brandDetails && brandDetails[0]?.totalBrandRevenue || "0"}</h4>
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
                {console.log(brandDetails,"shashank")}
                <div className='col-sm-4'>
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fs-16 fw-medium">Zashed Commission</p>
                                    <h4 className="mb-2">{brandDetails &&  brandDetails[0]?.totalBrandCommission || '0'}</h4>
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

                <div className='col-sm-4'>
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fs-16 fw-medium">Monthly Sales Growth</p>
                                    <h4 className="mb-2">{'sales growth data' || '0'}</h4>
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
            </div>

            <div className='row my-3'>
                <div className='col-sm-6'>
                    <h4>Month on Month Sales</h4>
                    <div className="card">
                        <div className="card-body">
                            {/* <Chart options={brandRevenueComposition?.options} series={brandRevenueComposition?.series} type="donut" width="380" /> */}
                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Photo Shoot Commission</p>
                                    <h4 className="mb-3">{ "0"}</h4>
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
            </div>

            <div className='row my-3'>
                <div className='col-sm-6'>
                    <h4>Year on Year Sales</h4>
                    <div className="card">
                        <div className="card-body">
                            {/* <Chart options={brandRevenueComposition?.options} series={brandRevenueComposition?.series} type="donut" width="380" /> */}
                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <h4>Best price point</h4>
                    <div className="card">
                        <div className="card-body">
                            {/* <Chart options={brandRevenueComposition?.options} series={brandRevenueComposition?.series} type="donut" width="380" /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
            <div className='col-sm-6'>
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Return %</p>
                                    <h4 className="mb-3">{brandDetails &&  brandDetails[0]?.totalBrandReturn ||  "0"}</h4>
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
                    <h4>Best Discount point</h4>
                    <div className="card">
                        <div className="card-body">
                            {/* <Chart options={brandRevenueComposition?.options} series={brandRevenueComposition?.series} type="donut" width="380" /> */}
                        </div>
                    </div>
                </div>
               
            </div>
            


        </>

    )
}

export default AdminBrandSelect