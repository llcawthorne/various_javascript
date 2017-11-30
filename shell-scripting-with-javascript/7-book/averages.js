var _ = require('lodash');
var moment = require("moment");

function average(values) {
  var sum = _.sum(values);
  var count = values.length;
  return sum / count;
}

function computeWeeklyAverage(dataRows) {
  return _(dataRows)
    .groupBy(r => moment(r[0]).week())
    .map((values, key) => {
      var closingPrices = _(values).map(v => v[4]).map(parseFloat).value();
      return {
        key: values[0][0],
        averageClosingPrice: average(closingPrices)
      }
    })
    .value();
}

module.exports = {
  average,
  computeWeeklyAverage
};
