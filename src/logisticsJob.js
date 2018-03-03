class logisticsJob {
  var _workerJobNoFrom;
  var _workerJobNoTo;
  var _logisticsCreepsAssigned;
  constructor (jobNoFrom, jobNoTo) {
    this._workerJobNoFrom = jobNoFrom;
    this._workerJobNoTo = jobNoTo;
  }

}

module.exports = logisticsJob;
