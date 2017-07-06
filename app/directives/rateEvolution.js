'use strict';

app.directive('rateEvolution', function(){
  return {
    template: '<div id="chart"></div>',
    replace: true,
    scope: {
      transactions: '='
    },
    link: function(scope, elem){
      scope.transactions = scope.transactions.filter(function(elem){
        console.log(moment(elem.details.completed), moment().startOf('day').add(11, 'hours'));
        return moment(elem.details.completed).isAfter(moment().startOf('day').add(11, 'hours'))
      });
      console.log(scope.transactions);
      var ceil = 0;
      scope.transactions.forEach(function(elem){
        ceil = Math.max(ceil, parseInt(elem.details.new_balance.amount) + 100)
      });
      var data = scope.transactions.map(function(elem){
        return {
          y: Math.round((ceil - parseInt(elem.details.new_balance.amount))/ceil*300, 2) / 100,
          x: moment(elem.details.completed).unix()
        }
      })
      .sort(function(a,b){
        if (a.x > b.x) return 1;
        if (a.x < b.x) return -1;
        return 0;
      });
      var options = {
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
          visible: false
        },
        series: [{
          dataGrouping: {
            smoothed: true,
            forced: true,
            approximation: 'average'
          },
          type: 'areaspline',
          marker: {
            enabled:false
          },
          name: 'Other',
          data: data,
          lineColor: '#7FCFDC',
          fillColor: '#3F496C'
        }]
      };
      Highcharts.chart('chart', options)
    }
  }
});