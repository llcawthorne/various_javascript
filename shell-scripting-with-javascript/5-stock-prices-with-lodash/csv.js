#!/usr/bin/env node

require("shelljs/global");
var csv = require('csv');
var _ = require('lodash');
var moment = require('moment');

var csvData = cat("./table.csv");

function average(values) {
  return _.sum(values) / values.length;
}

csv.parse(csvData, (error, rows) => {
  var dataRows = rows.slice(1);                       // slice off data after first header row

  var closingPrices = dataRows
    .map(row => row[4])             // return stock closing prices from fifth column
    .map(parseFloat);               // converted to float values

  var dataSortedByClosingPrice = _(dataRows)
    .sortBy(r => parseFloat(r[4]))
    .value();
  // echo(dataSortedByClosingPrice);

  var weeklyAverages = _(dataRows)
    .groupBy(r => moment(r[0]).week())
    .map((values, key) => {
      var closingPrices = _(values).map(v => v[4]).map(parseFloat).value();
      return {
        week: key,
        averageClosingPrice: average(closingPrices)
      }
    })
    .value();
  echo(weeklyAverages);

  echo(`Monthly Average Closing Price: ${ average(closingPrices) }`);
});