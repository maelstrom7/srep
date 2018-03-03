class spawn {
  constructor (gameSpawn) {

    var sources = [];
    var tmpSources = sources.concat(gameSpawn.room.find(FIND_SOURCES));
    this.sources = _.sortBy(tmpSources, s => gameSpawn.pos.getRangeTo(s))

    this.controller = gameSpawn.room.controller;

    this.gameSpawn = gameSpawn;
  }
}

module.exports = spawn;
