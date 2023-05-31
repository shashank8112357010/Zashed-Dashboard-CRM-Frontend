import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Pie = (props) => {
  return (
    <ReactApexChart options={{
        chart: {
            width: 400,
            type: 'pie',
        },
        labels: props?.labels,
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
    }} series={props?.series} type="pie" width={380} />

  )
}

export default Pie