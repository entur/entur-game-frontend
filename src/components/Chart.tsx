import dynamic from 'next/dynamic'
import 'chart.js/auto'
import React from 'react'

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
})

const options = {
    plugins: {
        legend: {
            display: false, // This will remove the legend from the chart
        },
    },
}

interface BarChartProps {
    dataValues: number[]
}

// eslint-disable-next-line react/prop-types
const BarChart: React.FC<BarChartProps> = ({ dataValues }) => {
    const data = {
        labels: ['Reiseplanleggeren', 'En personbil'],
        datasets: [
            {
                label: '',
                data: dataValues,
                backgroundColor: ['#ffcece', '#c7cdeb'],
                borderColor: ['#f73e3b', '#181c56'],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div style={{ width: '600px', height: '500px' }}>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart
