import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
import "./pages.css"
import { getBrands, getSalesCommission, getSalesRevenue, getAllBrandData } from '../services/services';
import { Form } from 'react-bootstrap';
import AdminBrandSelect from './AdminBrandSelect';
const AdminSales = () => {
    const [loading, setLoading] = useState(false);
    const [selectBrand, setSelectBrands] = useState('All Brands');
    const [selectedBrandData , setSelectedBrandData] = useState([])
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [totalCommission, settotalCommission] = useState(null);
    const [allBrands, setAllBrands] = useState([]);
    const [brandPerformance, setBrandPerformance] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    })
    const [brandRevenueComposition, setBrandRevenueComposition] = useState({
        options: {
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
            }],
            labels: []
        },
        series: []
    })
    const [brandPerformanceQuantity, setBrandperformancequantity] = useState(
        {
            options: {
                chart: {
                    id: "basic-bar",
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        }
    )
    const [ZashedcommissionComposition, setZashedcommissionComposition] = useState({
        options: {
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
            }],
            labels: []
        },
        series: []
    })
    const [allBrandData, setAllBrandData] = useState();
    const fetchRevenue = () => {
        getSalesRevenue().then((res) => {
            console.log(res, "revenue");
            setTotalRevenue(res?.data?.results?.totalRevenue);
            const yaxisbrandperformance = res?.data?.results?.brandDetails?.map((item) => item?.totalRevenue);
            const yaxisbrandperformanceQuantity = res?.data?.results?.brandDetails?.map((item) => item?.totalSales);
            const revenueCommissionCompositionseries = res?.data?.results?.brandDetails?.map((item) => +item?.revenueComposition);
            const brandLables = res?.data?.results?.brandDetails?.map((item) => item?.brand_name);

            const xaxis = res?.data?.results?.brandDetails?.map((item) => item?.brand_name)
            setBrandPerformance((prev) => ({
                ...prev, series: [
                    {
                        name: "series-1",
                        data: yaxisbrandperformance
                    }
                ]
                ,
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                    xaxis: {
                        categories: xaxis
                    }
                }

            }))
            setBrandperformancequantity((prev) => ({
                ...prev,
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                    xaxis: {
                        categories: xaxis
                    }
                },
                series: [
                    {
                        name: "series-1",
                        data: yaxisbrandperformanceQuantity
                    }
                ]
            }))
            setBrandRevenueComposition((prev) => ({
                ...prev, series: revenueCommissionCompositionseries,
                options: {
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
                    }],
                    labels: brandLables
                }

            }));
        }).catch((err) => {
            console.log(err);
        })
    }
    const fetchCommission = () => {
        getSalesCommission().then((res) => {
            console.log(res, "commission");
            settotalCommission(res?.data?.results?.totalCommission);
            const zashedCommissionseries = res?.data?.results?.brandDetails?.map((item) => +item?.commissionComposition);

            const labels = res?.data?.results?.brandDetails?.map((item) => item?.brand_name);

            setZashedcommissionComposition((prev) => ({
                ...prev, options: {
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
                    }],
                    labels: labels
                },
                series: zashedCommissionseries

            }))


        }).catch((err) => console.log(err))

    }

    const fetchBrand = () => {
        getBrands().then((res) => {
            console.log(res);
            setAllBrands(res.data.results)
        }).catch((err) => {
            console.log(err);
        })
    }
    const fetchBrandData = () => {
        getAllBrandData().then((res) => {
            console.log(res?.data?.results?.brand_data, "allbranddata");
            const brandFilterSeries = res?.data?.results?.brand_data?.map((item) => {
                return {
                    name: item?.brand_name,
                    data: item?.yearlyRevenueData[0]?.monthlyRevenueData?.map((item) => item?.totalSales)
                }
            })
            const brandSeriesXaxis = res?.data?.results?.brand_data?.map((item) => {
                return item?.yearlyRevenueData[0]?.monthlyRevenueData?.map((item) => item?.month)
            })
            console.log(brandFilterSeries, brandSeriesXaxis);
            brandFilterSeries ? setLoading(true) : setLoading(false)
            setAllBrandData((prev) => ({
                ...prev,
                series: brandFilterSeries,
            }))
        }).catch((err) => {
            console.log(err);
        })
    }
    const fetchSelectedBrand = (data) => {
        const filterBrandId = allBrands.filter((item)=>item.name === data);
        if(filterBrandId.length != 0){
            const id = filterBrandId[0].id
            getAllBrandData({
                "brand_ids": [id],
            }).then((res) => {
                setSelectedBrandData(res.data.results)
                console.log(res, "selected");
            }).catch((err) => {
                console.log(err);
            })
        }
       
       
    }
    useEffect(() => {
        fetchRevenue();
        fetchCommission();
        fetchBrand();
        fetchBrandData();
    }, [])
    return (

        <div className="main-content">
            {
                console.log(allBrandData, "hello")
            }
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-sm-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <h2 className="mb-sm-0 font-size-20">{selectBrand} Sales</h2>
                                <Form.Select aria-label="Default select example" onClick={(e) => { setSelectBrands(e.target.value); fetchSelectedBrand(e.target.value) }} className='w-25 bg-primary text-white'>
                                    <option value={"All Brands"}>{"All Brands"}</option>
                                    {
                                        allBrands && allBrands?.map((brand) => {
                                            // console.log();
                                            return (
                                                <>
                                                    <option key={brand?.name.toString()} id={brand?.id} value={brand?.name}>{brand?.name}</option>
                                                </>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                    {
                        selectBrand && selectBrand === "All Brands" ? (
                            <>
                                <div className='row'>
                                    <div className='col-sm-5 '>
                                        <div className="card mini-stats-wid">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="flex-grow-1">
                                                        <p className="text-muted fw-medium">Total Revenue</p>
                                                        <h4 className="mb-3">{totalRevenue || "0"}</h4>
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
                                                        <h4 className="mb-2">{totalCommission || '0'}</h4>
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
                                                    options={brandPerformance?.options}
                                                    series={brandPerformance?.series}
                                                    type="bar"
                                                    width="650"
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
                                                <Chart options={brandRevenueComposition?.options} series={brandRevenueComposition?.series} type="donut" width="380" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-7 col-sm-12'>
                                        <h4>Brand perfomance Quantity</h4>
                                        <div className="card">
                                            <div className="card-body">
                                                <Chart
                                                    options={brandPerformanceQuantity?.options}
                                                    series={brandPerformanceQuantity?.series}
                                                    type="bar"
                                                    width="650"
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
                                                <Chart options={ZashedcommissionComposition?.options} series={ZashedcommissionComposition?.series} type="donut" width="380" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-7 col-sm-12'>
                                        <h4>Month on Month</h4>
                                        <div className="card">
                                            <div className="card-body">
                                                {
                                                    loading && loading ?
                                                        <ReactApexChart options={{
                                                            chart: {
                                                                height: 350,
                                                                type: 'line',
                                                                zoom: {
                                                                    enabled: true
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
                                                                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "Oct", "Nov", "Dec"],
                                                            }
                                                        }} series={allBrandData?.series} height={350} />
                                                        :
                                                        "Loading"
                                                }

                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </>
                        ) :
                            <AdminBrandSelect branddata={selectedBrandData} />
                    }

                </div>
            </div>
        </div >
    )
}
export default AdminSales;






export const monthOnmonth = () => {
    return {
        series: [{
            name: "Adidas",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        },
        {
            name: "Puma",
            data: [11, 41, 22, 51, 49, 62, 69, 87, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: true
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
    }
}