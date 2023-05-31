import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
import { getAllBrandData } from '../services/services';
import Loader from '../common/Loader';
import Pie from '../graph/Pie';


const AdminBrandSelect = (props) => {
    const [selectedBrandData, setSelectedBrandData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState({
        series: [],
        lables: []
    })
    const [articleData, setArticleData] = useState({
        series: [],
        lables: []
    })
    const [aspRange, setAspRange] = useState({
        series: [],
        lables: []
    })
    const [discountRange, setDiscountRange] = useState({
        series: [],
        lables: []
    })
    const [pieData, setPieData] = useState({
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
    const [portalBar, setPortalBar] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ["Ajio", "Myntra"]
            }
        },
        series: [
            {
                data: [66, 55]
            }
        ]
    })

    const portalWiseDataCal = (data) => {
        //field totalSales 
        const categories = data?.map((item) => item.field);
        const salesdata = data?.map((item) => item.totalSales);
        setPortalBar((prev) => ({
            ...prev,
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: categories
                }
            },
            series: [
                {
                    data: salesdata
                }
            ]
        }))



    }
    const mainCategoryWiseDataCal = (data) => {
        const lables = data?.map((item) => item?.field);
        const series = data?.map((item) => (item?.totalSales / item?.totalReturn) * 100);
        setCategoryData((prev) => ({ ...prev, lables: lables, series: series }))
    }
    const articleWiseDataCal = (data) => {
        const lables = data?.map((item) => item?.field);
        const series = data?.map((item) => (item?.totalSales));
        setArticleData((prev) => ({ ...prev, lables: lables, series: series }))
    }
    const aspRangeCal = (data) => {
        const lables = Object.keys(data)
        const series = Object.values(data)
        setAspRange((prev) => ({ ...prev, lables: lables, series: series }))
    }
    const highestDiscountRangeDataCal = (data) => {
        const lables = Object.keys(data)
        const series = Object.values(data)
        setDiscountRange((prev) => ({ ...prev, lables: lables, series: series }))

    }
    const monthlyRevenueDataCal = (data) => {
        const salesData = data?.map((item) => item.totalSales ? item.totalSales : 0);
        setBar((prev) => ({
            ...prev, series: [{
                name: 'Inflation',
                data: salesData
            }],
        }))

    }
    useEffect(() => {
        setLoading(true)
        console.log(props);
        getAllBrandData(props.endDate.length!=0 ? 
            {
                "brand_ids": [props?.BrandId],
                "start_date":props.startDate,
                "end_date":props.endDate
            }
            : props.startDate.length!=0 ? {
                "brand_ids": [props?.BrandId], 
                "start_date":props.startDate,
            }
            :
             {
            "brand_ids": [props?.BrandId],
        }).then((res) => {
            setSelectedBrandData(res.data.results?.brand_data[0]);
            portalWiseDataCal(res.data.results?.brand_data[0]?.portalWiseData)
            mainCategoryWiseDataCal(res.data.results?.brand_data[0]?.mainCategoryWiseData);
            articleWiseDataCal(res.data.results?.brand_data[0]?.articleWiseData)
            aspRangeCal(res.data.results?.brand_data[0]?.ASP);
            highestDiscountRangeDataCal(res.data.results?.brand_data[0]?.highestDiscountRangeData);
            monthlyRevenueDataCal(res.data.results?.brand_data[0]?.yearlyRevenueData[0]?.monthlyRevenueData)
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }, [props])
    return (
        <>
            <div className='row'>
                <div className='col-sm-6'>
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Net Sales Revenue</p>
                                    <h4 className="mb-3">{loading ? '...' : selectedBrandData?.totalBrandRevenue}</h4>
                                </div>
                                <div className="flex-shrink-0 align-self-center ">
                                    <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <i className="bx bx-rupee font-size-24"></i>
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
                                    <p className="text-muted fs-16 fw-medium">Sales for Zash</p>
                                    <h4 className="mb-2">{loading ? '...' : selectedBrandData?.totalBrandSales}</h4>
                                </div>
                                <div className="flex-shrink-0 align-self-center ">
                                    <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <i className="bx bx-rupee font-size-24"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className='row'>
                <div className='col-sm-6'>
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fs-16 fw-medium">Net Sales Quantity</p>
                                    <h4 className="mb-2">{loading ? '...' : selectedBrandData?.totalBrandSalesQty}</h4>
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
                                    <p className="text-muted fs-16 fw-medium">AOV</p>
                                    <h4 className="mb-2">{loading ? '...' : selectedBrandData?.brandAOV}</h4>
                                </div>
                                <div className="flex-shrink-0 align-self-center ">
                                    <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            <i className="bx bx-rupee font-size-24"></i>
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
                                    <p className="text-muted fw-medium">Return Quantity</p>
                                    <h4 className="mb-3">{loading ? '...' : selectedBrandData?.totalBrandReturnQty}</h4>
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
                                    <p className="text-muted fw-medium">Return %</p>
                                    doubt
                                    <h4 className="mb-3">{loading ? '...' : (selectedBrandData?.totalBrandSalesQty / selectedBrandData?.totalBrandReturnQty) * 100}</h4>
                                </div>
                                <div className="flex-shrink-0 align-self-center ">
                                    <div className="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                        <span className="avatar-title rounded-circle bg-primary">
                                            {/* <i className="bx bx-rupee font-size-24"></i> */}
                                            <i class="fa fa-percent font-size-17"></i>
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
                    <h4>Portal Wise Sales</h4>
                    <div className="card">
                        <div className="card-body">
                            <Chart
                                options={portalBar?.options}
                                series={portalBar?.series}
                                type="bar"
                                width={390}
                            />
                        </div>
                    </div>
                </div>

                <div className='col-sm-6'>
                    <h4>Main Category Wise %</h4>
                    <div className="card">
                        <div className="card-body">
                            <Pie labels={categoryData?.lables} series={categoryData?.series} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <div className='col-sm-6'>
                    <h4>Article Wise </h4>
                    <div className="card">
                        <div className="card-body">
                            <Pie labels={articleData?.lables} series={articleData?.series} />
                            {/* <ReactApexChart options={pieData.options} series={pieData.series} type="pie" width={380} /> */}
                        </div>
                    </div>
                </div>

                <div className='col-sm-6'>
                    <h4>ASP Range</h4>
                    <div className="card">
                        <div className="card-body">
                            <Pie labels={aspRange?.lables} series={aspRange?.series} />

                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <div className='col-sm-6'>
                    <h4>Discount Range</h4>
                    <div className="card">
                        <div className="card-body">
                            <Pie labels={discountRange?.lables} series={discountRange?.series} />

                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <h4>Size Wise Sales</h4>
                    <div className="card">
                        <div className="card-body">

                            <ReactApexChart options={pieData.options} series={pieData.series} type="pie" width={380} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <div className='col-sm-12'>
                    <h4>Month on Month Sales</h4>
                    <div className="card">
                        <div className="card-body">
                            <ReactApexChart options={bar?.options} series={bar?.series} type="bar" height={350} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminBrandSelect