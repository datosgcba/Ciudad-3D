const chart = document.getElementById('chart').getContext('2d');

const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre"],
    datasets: [
        {
            label: "Grafico tipo timeline",
            // RELLENO
            fill: false,
            lineTension: 0,
            backgroundColor: "rgb(46,91,190)",
            borderColor: "rgb(46,91,190)",//"rgb(196,196,196)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#FABB14",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHitRadius: 0,
            data: [65, 59, 80, 81, 56, 9, 58,70,66,80]
        }
    ]}

const options = {
    legend: {
        display: true
    },
    scales: {
        // EJE Y
        yAxes: [{
            scaleLabel: {
                labelString: 'EJE Y',
                display:true
            },

            // REFERENCIAS
            ticks: {
                display: true,
            },
            // GRILLA
            gridLines: {
                display:true
            }
        }],
        // EJE X
        xAxes: [{
            scaleLabel: {
                labelString: 'EJE x',
                display:true
            },
            // REFERENCIAS
            ticks: {
                display: true
            },
            // GRILLA
            gridLines: {
                display:true
            },
        }],
    },
    layout: {
        padding: {
            left: 0,
            right: 7,
            top: 0,
            bottom: 0
            borderDashOffset: 0.0,
        }
    }
}

let dataChart = new Chart(chart,
{
    type:'line',
    data:data,
    options:options


});