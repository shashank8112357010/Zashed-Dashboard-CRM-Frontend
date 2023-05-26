import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const AdminBrandSelect = ({
    branddata
}) => {
    const brandDetails = branddata?.brand_data?.map((item) => item);
    const [discountPie, setDiscountPie] = useState({
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    })
    const [bestPricePie, setbestPricePie] = useState({
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    })
    const [monthonmonthLine, setmonthonmonthLine] = useState({
        series: [{
            name:  [brandDetails && brandDetails[0]?.brand_name],
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },

    })
    const [yearonyearLine, setyearonyearLine] = useState({
        series: [{
            name: [ brandDetails && brandDetails[0].brand_name],
            data: [4, 41, 35, 6, 91, 33, 69, 66, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Product Trends by Year',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007'],
            }
        },

    })
    return (
        <>
            <div className='row'>
                <div className='col-sm-4'>
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Total Revenue</p>
                                    <h4 className="mb-3">{brandDetails && brandDetails[0]?.totalBrandRevenue || "0"}</h4>
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
                                    <p className="text-muted fs-16 fw-medium">Zashed Commission</p>
                                    <h4 className="mb-2">{brandDetails && brandDetails[0]?.totalBrandCommission || '0'}</h4>
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
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Return %</p>
                                    <h4 className="mb-3">{brandDetails && brandDetails[0]?.totalBrandReturn || "0"}</h4>
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
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Photo Shoot Commission</p>
                                    <h4 className="mb-3">{"0"}</h4>
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
                            <ReactApexChart options={yearonyearLine.options} series={yearonyearLine.series} type="line" height={350} />
                        </div>
                    </div>
                </div>

                <div className='col-sm-6'>
                    <h4>Month on Month Sales</h4>
                    <div className="card">
                        <div className="card-body">
                            <ReactApexChart options={monthonmonthLine.options} series={monthonmonthLine.series} type="line" height={350} />


                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <div className='col-sm-6'>
                    <h4>Best price point</h4>
                    <div className="card">
                        <div className="card-body">
                            <ReactApexChart options={bestPricePie.options} series={bestPricePie.series} type="pie" width={380} />

                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <h4>Best Discount point</h4>
                    <div className="card">
                        <div className="card-body">
                            <ReactApexChart options={discountPie.options} series={discountPie.series} type="pie" width={380} />


                            {/* <Chart options={brandRevenueComposition?.options} series={brandRevenueComposition?.series} type="donut" width="380" /> */}
                        </div>
                    </div>
                </div>

            </div>



        </>

    )
}

export default AdminBrandSelect