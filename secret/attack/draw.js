google.charts.load('current', {packages: ['corechart', 'line', 'table']});
//google.charts.setOnLoadCallback(drawBasic);

function draw(size,array,name) {
    console.log(array);
    console.log(size);
    var data = new google.visualization.DataTable();

    data.addColumn('number', 'size');
    data.addColumn('number', name);

    data.addRows(array);

    var options = {
        title: 'Time Consumption for Preocessing Different Size of Files',
        vAxis: {title:"Time"},
        hAxis: {title:"File Size"},
        width: 900,
        height: 500
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}
