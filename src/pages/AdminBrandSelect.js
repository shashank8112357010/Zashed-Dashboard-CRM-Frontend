import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";


const AdminBrandSelect = (props) => {
    console.log(props);
    useEffect(()=>{
        const brandDetails = props?.branddata?.brand_data?.map((item) => item);
        const data = brandDetails?.map((item)=>item)
        const [value] = data && data
        console.log(value);
    },[props.branddata])
    
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
    });
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
    });
    const [monthonmonthBar, setmonthonmonthBar] = useState(
        {
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

        }

    )
    const [yearonyearLine, setyearonyearLine] = useState({
        series: [{
            name: 'amma',
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
       hello
          
        </>

    )
}

export default AdminBrandSelect