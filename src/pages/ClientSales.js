import React, { useState } from 'react'
import CommingSoon from '../common/CommingSoon'
import { Link } from 'react-router-dom'
import "./pages.css"
import { getAllBrandData } from '../services/services'
import { useEffect } from 'react'

const ClientSales = () => {
    const [brandData, setBrandData] = useState();
    const [bar, setBar] = useState({
        series: [{
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "%";
                    }
                }

            },
            title: {
                text: 'Monthly Sales in 2023',
                floating: true,
                offsetY: 330,
                align: 'center',
                style: {
                    color: '#444'
                }
            }
        },
    })
    const fetchBrandData = () => {
        getAllBrandData().then((res) => {
            setBrandData(res?.data?.results)
        }).catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchBrandData()
    }, [])
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
                                    <span href='#' className='font-size-15 text-white border p-2 border-dark rounded-pill bg-primary'>{brandData?.brand_data[0].brand_name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <CommingSoon/> */}
                    {/* start */}
                    <div className='row d-flex justify-content-between align-items-center'>
                        <div className='col-sm-4'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">Total Revenue</p>
                                            <h4 className="mb-0">{brandData?.totalRevenue}</h4>
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
                        <div className='col-sm-4'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">Orders</p>
                                            <h4 className="mb-0">{brandData?.totalQty}</h4>
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
                  




                    <div className='row d-flex justify-content-between align-items-center'>


                        <div className='col-sm-6'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">Return</p>
                                            <h4 className="mb-0">{brandData?.totalReturn}</h4>
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
                                            <p className="text-muted fw-bold font-size-16">Order To Return</p>
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
                    <div className='row'>
                    <div className='col-sm-12'>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-bold font-size-16">Revenue overview</p>
                                        </div>

                                        bar
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