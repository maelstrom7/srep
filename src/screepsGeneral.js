const math = require('math');

class screepsGeneral {
  constructor () {
  }

  static getTerrainArray(room, pos, range) {

    return (room.lookForAtArea(LOOK_TERRAIN,(pos.y)-range,(pos.x)-range,(pos.y)+range,(pos.x)+range, true));

  }

  static getMedianPos(room, pos, range, filter) {
    var x = [];
    var y = [];
    var i;

    var result = this.getTerrainArray(room, pos, range);

    for (i in result) {
      if (result[i].terrain == filter) {
        x.push(result[i].x);
        y.push(result[i].y);
      }
    }

    var medx = math.getMedian(x);
    var medy = math.getMedian(y);

    return new RoomPosition(medx, medy, room.name);

  }

}

module.exports = screepsGeneral;
