import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
import "./pages.css"
const Sales = () => {
    const [choosebrand , setChooseBrand] = useState(false)

    const [barChart, setbarChart] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            xaxis: {
                categories: ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6", "Brand 7", "Brand 8"]
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    })

    const [pieChart, setPieChart] = useState({
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 310
                    },
                    legend: {
                        position: 'left'
                    }
                }
            }]
        },
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']

    })

    const [lineChart, setLineChart] = useState({

        series: [{
            name: "Desktops",
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
                enabled: true
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
        }
    })
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-sm-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h2 className="mb-sm-0 font-size-20">Sales</h2>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" onClick={()=>setChooseBrand(!choosebrand)} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Choose Brand
                                    </button>
                                    <ul className={`dropdown-menu  ${ choosebrand && 'show' }`} aria-labelledby="dropdownMenuLink">
                                        <li><a className="dropdown-item" href="#">Brand 1</a></li>
                                        <li><a className="dropdown-item" href="#">Brand 2</a></li>
                                        <li><a className="dropdown-item" href="#">brand 3</a></li>
                                        <li><a className="dropdown-item" href="#">brand 4</a></li>
                                        <li><a className="dropdown-item" href="#">brand 5</a></li>
                         
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-5 '>
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">Total Revenue</p>
                                            <h4 className="mb-3">$35, 723</h4>
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
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fs-16 fw-medium">Total Commission</p>
                                            <h4 className="mb-2">$35, 723</h4>
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
                        <div className='col-sm-7'>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Brand Perfomance</h4>
                                    <Chart
                                        options={barChart?.options}
                                        series={barChart?.series}
                                        type="bar"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row my-3'>
                        <div className='col-lg-5 col-sm-12'>
                            <h4>Revenue Composition By Brands</h4>
                            <div className="card">
                                <div className="card-body">
                                    <Chart options={pieChart?.options} series={pieChart?.series} type="donut" />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-7 col-sm-12'>
                            <h4>Brand perfomance Quantity</h4>
                            <div className="card">
                                <div className="card-body">
                                    <Chart
                                        options={barChart?.options}
                                        series={barChart?.series}
                                        type="bar"
                                        />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6 col-sm-12'>
                            <h4>Zashed commission composition</h4>
                            <div className="card">
                                <div className="card-body">
                                    <Chart options={pieChart?.options} series={pieChart?.series} type="donut" />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <h4>Month on Month</h4>
                            <div className="card">
                                <div className="card-body">
                                    <ReactApexChart options={lineChart?.options} series={lineChart?.series} type="line" height={350} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- container-fluid --> */}
            </div>
        </div>
    )
}

export default Sales