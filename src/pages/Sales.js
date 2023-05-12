import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
import "./pages.css"
import { getBrands, getSalesCommission, getSalesRevenue } from '../services/services';
import { brandPerfomance, brandPerfomanceQuantity, monthOnmonth, revenueCompositionByBrands, zashedCommissionComposition } from '../GraphData/allGraph';
const Sales = () => {
    const [BrandSelectHeading, setBrandSelectHeading] = useState('Choose Brands');
    const [totalCommission, settotalCommission] = useState('')
    const [totalRevinew, settotalRevinew] = useState('');
    const [brands, setBrands] = useState([]);
    const [choosebrand, setChooseBrand] = useState(false);
    const [performanceQuantity, setDataa] = useState(brandPerfomanceQuantity())
    const [zashedCommissionCompositionData, setzashedCommissionComposition] = useState(zashedCommissionComposition())
    const [revenueCompositionByBrandsData, setPieChartRevenueCompositionByBrandsData] = useState(revenueCompositionByBrands())
    const [lineChart, setLineChart] = useState(monthOnmonth())
    const [performanceRevenue, setData] = useState(brandPerfomance())
    const getAllBrands = () => {
        getBrands().then((res) => {
            setBrands(res?.data?.results)
        }).catch((err) => {
            console.log(err);
        })
    }
    const getAllCommissionData = () => {
        getSalesCommission().then((res) => {
            settotalCommission(res.data.results.totalCommission)
        }).catch((err) => {
            console.log(err);
        })
    }
    const getAllRevinew = () => {
        getSalesRevenue().then((res) => {
            settotalRevinew(res.data.results)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        getAllBrands();
        getAllCommissionData();
        getAllRevinew();
    }, [])
    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-sm-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h2 className="mb-sm-0 font-size-20">Sales</h2>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle p-2" style={{ minWidth: "120px" }} onClick={() => setChooseBrand(!choosebrand)} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        {BrandSelectHeading}
                                    </button>
                                    <ul className={`dropdown-menu  ${choosebrand && 'show'}`} aria-labelledby="dropdownMenuLink">
                                        {
                                            brands && brands.map((item) => {
                                                return (
                                                    <li key={item.name.toString()} className='dropdown-item cursor-pointer' onClick={() => { setBrandSelectHeading(item.name); setChooseBrand(false) }}>{item.name}</li>
                                                )
                                            })
                                        }
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
                                            <h4 className="mb-3">{totalRevinew?.totalRevenue}</h4>
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
                                            <h4 className="mb-2">{totalCommission}</h4>
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
                                        options={performanceRevenue?.options}
                                        series={performanceRevenue?.series}
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
                                    <Chart options={revenueCompositionByBrandsData?.options} series={revenueCompositionByBrandsData?.series} type="donut" />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-7 col-sm-12'>
                            <h4>Brand perfomance Quantity</h4>
                            <div className="card">
                                <div className="card-body">
                                    <Chart
                                        options={performanceQuantity?.options}
                                        series={performanceQuantity?.series}
                                        type="bar"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-5 col-sm-12'>
                            <h4>Zashed commission composition</h4>
                            <div className="card">
                                <div className="card-body">
                                    <Chart options={zashedCommissionCompositionData?.options} series={zashedCommissionCompositionData?.series} type="donut" />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-7 col-sm-12'>
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