import { getSalesCommission, getSalesMonthOnMonth, getSalesRevenue } from "../services/services"

const initialData = {
    xaxis: [],
    brandPerformanceseries: [{
        name: "series-1",
        data: []
    }],
    brandPerformanceQuantitySeries: [{
        name: "series-1",
        data: []
    }],
    zashedCommissionCompositionSeries: [],
    compositionByBrandsSeries: [],
    monthOnMonthData: {
        data: [],
        xaxis: []

    }
}
export const calculatebrandPerfomance = () => {
    // revenue
    getSalesRevenue().then((res) => {
        initialData.brandPerformanceseries[0].data = (res?.data?.results?.brandDetails.map((item) => item.totalRevenue))
        initialData.brandPerformanceQuantitySeries[0].data = (res?.data?.results?.brandDetails.map((item) => item.totalSales))
        initialData.xaxis = res?.data?.results?.brandDetails?.map((item) => item.brand_name);
        initialData.compositionByBrandsSeries = (res?.data?.results?.brandDetails.map((item) => parseFloat(item.revenueComposition)))
    }).catch((err) => {
        console.log(err);
    });
    // commission
    getSalesCommission().then((res) => {
        initialData.zashedCommissionCompositionSeries = (res?.data?.results?.brandDetails.map((item) => parseFloat(item.commissionComposition)))

    }).catch((err) => {
        console.log(err);
    })
    // month wise data
    getSalesMonthOnMonth().then((res) => {
    }).catch((err) => {
        console.log(err);
    })
}

export const brandPerfomance = () => {
    return {
        options: {
            chart: {
                id: "brand-Performnce"
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
                categories: initialData?.xaxis
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
        },
        series: initialData.brandPerformanceseries
    }

}
export const brandPerfomanceQuantity = () => {

    return {
        options: {
            chart: {
                id: "brand-performnce-Quantity"
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
                categories: initialData?.xaxis
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
        },
        series: initialData.brandPerformanceQuantitySeries
    }

}
export const zashedCommissionComposition = () => {
    return {
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
            }],
            labels: initialData?.xaxis
        },
        series: initialData.zashedCommissionCompositionSeries,
    }
}
export const revenueCompositionByBrands = () => {
    return {
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
            labels: initialData?.xaxis
        },
        series: initialData.compositionByBrandsSeries,

    }
}
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





