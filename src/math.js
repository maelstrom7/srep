class math {
  constructor () {
  }

  static getMedian(args) {
    if (!args.length) {return 0};
    var numbers = args.slice(0).sort((a,b) => a - b);
    var middle = Math.floor(numbers.length / 2);
    var isEven = numbers.length % 2 === 0;
    return isEven ? Math.floor((numbers[middle] + numbers[middle - 1]) / 2) : numbers[middle];
  }
}

module.exports = math;
