var _ = require('lodash');
var moment = require('moment');

function average(values) {
  return _.sum(values) / values.length;
}

function computeWeeklyAverage(dataRows) {
  return _(dataRows)
    .groupBy(r => moment(r[0]).week())
    .map((values, key) => {
      var closingPrices = _(values).map(v => v[4]).map(parseFloat).value();
      return {
        week: key,
        averageClosingPrice: average(closingPrices)
      }
    })
    .value();
}

module.exports = {
  average,
  computeWeeklyAverage
};