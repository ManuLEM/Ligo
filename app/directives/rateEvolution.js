'use strict';

app.directive('rateEvolution', function(bankApi){
  return {
    template: '<div id="chart"></div>',
    replace: true,
    scope: {
      ngModel: '='
    },
    link: function(scope, elem){
      scope.transactions = scope.ngModel;
      var ceil = 0;
      var transactionsByMin = {};
      var key = null;
      var data = [];
      scope.transactions.forEach(function(elem){
        ceil = Math.max(ceil, parseFloat(elem.details.new_balance.amount) + 100);
      });
      var now = moment();
      var seconds = 15;
      var latest = scope.transactions[scope.transactions.length-1];
      for (var i = 0; i < seconds; i++) {
        var point = {}
        if (i == 0) {
          point = {
            x: now.subtract(seconds, 'second').unix(),
            y: Math.round((ceil - parseFloat(latest.details.new_balance.amount))/ceil*300, 2) / 100
          }
        }
        else {
          var found = false;
          var x = now.subtract(seconds-i, 'seconds').unix();
          for (var transaction of scope.transactions) {
            if (moment(transaction.details.completed).unix() != x) continue;
            found = true;
            point = {
              x: x,
              y: Math.round((ceil - parseFloat(transaction.details.new_balance.amount))/ceil*300, 2) / 100
            }
            break;
          }
          if (!found) {
            point = {
              y: data[i-1].y,
              x: x
            }
          }
        }
        data.push(point);
      }
      data.sort(function(a,b){
        if (a.x > b.x) return 1;
        if (a.x < b.x) return -1;
        return 0;
      });
      var options = {
        credits: {
          enabled: false
        },
        title: {
          text: null
        },
        legend: {
          enabled: false
        },
        xAxis: {
          visible: false
        },
        yAxis: {
          visible: false,
          min: 0
        },
        chart: {
          spacingLeft: 0,
          spacingRight: 0,
          margin: [0, 50, 0, -5],
          backgroundColor: 'transparent',
          events: {
            load: function () {
              var series = this.series[0];
              var i = 0;
              setInterval(function () {
                i++;
                var latest = series.data[series.data.length-1];
                var stagnate = (i%3 == Math.round(Math.random()*3)) ? false : true;
                bankApi().transactions().all(latest,stagnate)
                .then(function(data){
                  var added = false;
                  for (var i = 0; i < data.length; i++) {
                    var elem = data[i];
                    if (moment(elem.details.completed).unix() <= latest.x) break;
                    console.log(added);
                    ceil = Math.max(ceil, parseFloat(elem.details.new_balance.amount) + 100);
                    var y = Math.round((ceil - parseFloat(elem.details.new_balance.amount))/ceil*300, 2) / 100
                    series.addPoint({
                      x:moment(elem.details.completed).unix(),
                      y:y
                    },true,true);
                  };
                  if (!added) {
                    series.addPoint({
                      x:moment().subtract(5, 'seconds').unix(),
                      y:latest.y
                    },true,true);
                  }
                });
              }, 1000);
            }
          }
        },
        plotOptions: {
          areaspline: {
            enableMouseTracking: false,
            dataLabels: {
              enabled: true,
              color: '#89FFA4',
              style: {
                "fontSize": "14px",
                "fontWeight": "bold",
                "textOutline": "none"
              },
              className: "value",
              useHTML: true,
              formatter: function(){
                if(this.point.index == this.series.data.length - 1) {
                  return this.y
                }
                return null;
              }
            }
          },
          series: {
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },
        // tooltip: { enabled: false },
        series: [{
          dataGrouping: {
            smoothed: true,
            forced: true,
            approximation: 'average'
          },
          type: 'areaspline',
          marker: {
            enabled:false,
            fillColor: '#89FFA4'
          },
          data: data,
          lineColor: '#89FFA4',
          fillColor: '#3F496C'
        }]
      };
      var chart = Highcharts.chart('chart', options);
    }
  }
});