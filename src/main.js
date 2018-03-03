const spawn = require('spawn');
const cjobHandler = require('jobHandler');
const cScreepsGeneral = require('screepsGeneral');

var spawns = [];
console.log('initialise');

var jobHandler = new cjobHandler();

for(const i in Game.spawns) {
    spawns.push(new spawn(Game.spawns[i]));
}

jobHandler.createJobs(spawns);

module.exports.loop = function () {
  for (const i in spawns) {
    jobHandler.doJobs(spawns[i].gameSpawn);
  }

  if ((Game.time % 10) == 0) {
    //console.log(jobHandler.printJobList());
  }

  var rpos = new RoomPosition(13, 39, Game.spawns['Spawn1'].room.name);
  var medPos = cScreepsGeneral.getMedianPos(Game.spawns['Spawn1'].room, rpos, 1, 'plain');

//  console.log(JSON.stringify(cScreepsGeneral.getTerrainArray(Game.spawns['Spawn1'].room, rpos, 1)));
//  console.log('Median Pos = ' + medPos.x + ',' + medPos.y);
//  console.log(spawns[0].gameSpawn.name);
//  console.log(spawns[0].sources.length);
}
