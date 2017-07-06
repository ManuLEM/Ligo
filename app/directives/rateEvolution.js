'use strict';

app.directive('rateEvolution', function(){
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
        ceil = Math.max(ceil, parseInt(elem.details.new_balance.amount) + 100);
      });
      data = scope.transactions.map(function(elem){
        return {
          y: Math.round((ceil - parseInt(elem.details.new_balance.amount))/ceil*300, 2) / 100,
          x: moment(elem.details.completed).unix()
        }
      });
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
          visible: false,
          scrollbar: {
            enabled: true
          },
          min: data[data.length-1].x - 70,
          max: data[data.length-1].x
        },
        yAxis: {
          visible: false,
          min: 0
        },
        chart: {
          spacingLeft: 0,
          spacingRight: 0,
          margin: [0, 50, 0, 0],
          backgroundColor: 'transparent'
        },
        plotOptions: {
          series: {
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },
        tooltip: { enabled: false },
        series: [{
          scrollbar: {
            enabled: true,
            barBackgroundColor: 'gray',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonBackgroundColor: 'gray',
            buttonBorderWidth: 0,
            buttonArrowColor: 'yellow',
            buttonBorderRadius: 7,
            rifleColor: 'yellow',
            trackBackgroundColor: 'white',
            trackBorderWidth: 1,
            trackBorderColor: 'silver',
            trackBorderRadius: 7
          },
          dataGrouping: {
            smoothed: true,
            forced: true,
            approximation: 'average'
          },
          type: 'areaspline',
          marker: {
            enabled:false
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