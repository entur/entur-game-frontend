'use client'

import dynamic from 'next/dynamic'
import 'chart.js/auto'

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
})
const data = {
    labels: ['Reiseplanleggeren', 'En personbil'],
    datasets: [
        {
            label: '',
            data: [12, 31],
            backgroundColor: ['#ffcece', '#c7cdeb'],
            borderColor: ['#f73e3b', '#181c56'],
            borderWidth: 1,
        },
    ],
}

const options = {
    plugins: {
        legend: {
            display: false, // This will remove the legend from the chart
        },
    },
}

const BarChart = () => {
    return (
        <div style={{ width: '600px', height: '500px' }}>
            <Bar data={data} options={options} />
        </div>
    )
}
export default BarChart
