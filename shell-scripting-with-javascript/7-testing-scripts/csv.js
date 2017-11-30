#!/usr/bin/env node

require("shelljs/global");
var csv = require('csv');
var _ = require('lodash');
var averages = require('./averages.js');

var csvData = cat("./table.csv");

csv.parse(csvData, (error, rows) => {
  var dataRows = rows.slice(1);                       // slice off data after first header row

  var closingPrices = dataRows
    .map(row => row[4])             // return stock closing prices from fifth column
    .map(parseFloat);               // converted to float values

  var dataSortedByClosingPrice = _(dataRows)
    .sortBy(r => parseFloat(r[4]))
    .value();
  // echo(dataSortedByClosingPrice);

  var weeklyAverages = averages.computeWeeklyAverage(dataRows);
  echo(weeklyAverages);

  echo(`Monthly Average Closing Price: ${ averages.average(closingPrices) }`);
});