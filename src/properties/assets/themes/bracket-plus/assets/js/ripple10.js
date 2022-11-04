
var ripple10 = (function($) {

    "use strict";
    return {
        /* --------------------------------- */
        /* Datepicker
        /* --------------------------------- */
        loaddaterangepicker: function() {
            if ($('#bs-daterangepicker').length > 0) {
                $('#bs-daterangepicker').daterangepicker({
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterdays': [moment().subtract('days', 1), moment()],
                            'Last 7 Days': [moment().subtract('days', 6), moment()],
                            'Last 30 Days': [moment().subtract('days', 29), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                        },
                        startDate: moment().subtract('days', 29),
                        endDate: moment()
                    },
                    function(start, end) {
                        $('#bs-daterangepicker span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                    }
                );
                $('#bs-daterangepicker span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
                $('#bs-daterangepicker').show();
            }
            $('#bs-daterangepicker').on('apply.daterangepicker', function(ev, picker) {
                var startDate = new Date(picker.startDate.format('YYYY/MM/DD')).getTime().toString();
                var endDate = new Date(picker.startDate.format('YYYY/MM/DD')).getTime().toString();
                var params = (startDate + '-' + endDate);

                $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=analytics.csv&callback=?', function(csv) {

                    //console.log(csv);
                    Highcharts.chart('streamtest', {

                        data: {
                            csv: csv
                        },

                        title: {
                            text: ''
                        },
                        colors: ['#1C8348', '#FF9800'],
                        subtitle: {
                            text: ''
                        },

                        xAxis: {
                            tickInterval: 7 * 24 * 3600 * 1000, // one week
                            tickWidth: 0,
                            gridLineWidth: 1,
                            labels: {
                                align: 'left',
                                x: 3,
                                y: -3
                            }
                        },

                        yAxis: [{ // left y axis
                            title: {
                                text: null
                            },
                            labels: {
                                align: 'left',
                                x: 3,
                                y: 16,
                                format: '{value:.,0f}'
                            },
                            showFirstLabel: false
                        }, { // right y axis
                            linkedTo: 0,
                            gridLineWidth: 0,
                            opposite: true,
                            title: {
                                text: null
                            },
                            labels: {
                                align: 'right',
                                x: -3,
                                y: 16,
                                format: '{value:.,0f}'
                            },
                            showFirstLabel: false
                        }],

                        legend: {
                            align: 'left',
                            verticalAlign: 'top',
                            y: -20,
                            floating: true,
                            borderWidth: 0
                        },

                        tooltip: {
                            shared: true,
                            crosshairs: true
                        },

                        plotOptions: {
                            series: {
                                cursor: 'pointer',
                                point: {
                                    events: {
                                        click: function(e) {
                                            hs.htmlExpand(null, {
                                                pageOrigin: {
                                                    x: e.pageX || e.clientX,
                                                    y: e.pageY || e.clientY
                                                },
                                                headingText: this.series.name,
                                                maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                                    this.y + ' visits',
                                                width: 200
                                            });
                                        }
                                    }
                                },
                                marker: {
                                    lineWidth: 1
                                }
                            }
                        },

                        series: [{
                            name: 'All visits',
                            lineWidth: 4,
                            marker: {
                                radius: 4
                            }
                        }, {
                            name: 'New visitors'
                        }]
                    });
                });


            })


        },
        test: function() {
            alert('halo!');
        }

    };
        $(function() {
        $('#sentiment').click(function() {

            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'This is a regular notice!',
                // (string | mandatory) the text inside the notification
                text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',
                // (string | optional) the image to display on the left
                // image: 'images/confirm.png',
                // (bool | optional) if you want it to fade out on its own or just sit there
                // sticky: false,
                // (int | optional) the time you want it to be alive for before fading out
                // time: ''
            });

            return false;

        });
    });
})(jQuery);

// Highcharts.setOptions({
//     colors: ['#13668F', '#FA6754', '#00BF00', '#BFFF00', '#FF001C', '#930023', '#61D2ED', '#0043B1', '#EE31A8']
// });


