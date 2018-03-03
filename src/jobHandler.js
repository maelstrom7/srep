const cworkerJob = require('workerJob');
const cScreepsGeneral = require('screepsGeneral');

class jobHandler {
  constructor () {
    this.workerJobList = [];
    this.workerJobNo = 1;
  }

  doJobs(spawn) {
    var workerJob = new cworkerJob();

/*    if (Object.keys(Game.creeps).length > 1) {
      runJobs(spawn);
    } else {
      if (Object.keys(Game.creeps).length == 0) {
        workerJob.createWorker(spawn);
      } else {
        var creepNameArray = Object.keys(Game.creeps);
        workerJob.doBasicJob(Game.creeps[creepNameArray[0]]);
      }
    } */
  }

  createJobs(spawns) {
    for (const i in spawns) {
      var sources = spawns[i].sources;
      var priority = 50;
      var allocationGroup = 1;
      for (const sourceIdx in sources) {
        this.workerJobList.push(new cworkerJob(this.workerJobNo, spawns[i], cworkerJob.jobTypeHarvest, sources[sourceIdx], cworkerJob.jobDirectionGather, priority, allocationGroup));
        this.workerJobNo++;
        priority--;

        spawns[i].gameSpawn.room.createConstructionSite(cScreepsGeneral.getMedianPos(spawns[i].gameSpawn.room, sources[sourceIdx].pos, 1, 'plain'),STRUCTURE_CONTAINER);

        var constructionSite = sources[sourceIdx].pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        this.workerJobList.push(new cworkerJob(this.workerJobNo, spawns[i], cworkerJob.jobTypeConstruct, constructionSite, cworkerJob.jobDirectionConsume, 60, allocationGroup));
        this.workerJobNo++;

        allocationGroup++;

      }

      this.workerJobList.push(new cworkerJob(this.workerJobNo, spawns[i], cworkerJob.jobTypeUpgrade, spawns[i].controller, cworkerJob.jobDirectionConsume, 40, allocationGroup));
      this.workerJobNo++;

      var spawnContainerPos;

      if (spawns[i].gameSpawn.pos.getRangeTo(spawns[i].controller) <= 4) {
        spawnContainerPos = new RoomPosition(Math.floor((spawns[i].controller.pos.x + spawns[i].gameSpawn.pos.x)/2), Math.floor((spawns[i].controller.pos.y + spawns[i].gameSpawn.pos.y)/2), spawns[i].gameSpawn.room.name);
      } else {
        spawnContainerPos = cScreepsGeneral.getMedianPos(spawns[i].gameSpawn.room, spawns[i].gameSpawn.pos, 1, 'plain');
      }

      spawns[i].gameSpawn.room.createConstructionSite(spawnContainerPos,STRUCTURE_CONTAINER);

      var constructionSite = spawns[i].gameSpawn.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
      this.workerJobList.push(new cworkerJob(this.workerJobNo, spawns[i], cworkerJob.jobTypeConstruct, constructionSite, cworkerJob.jobDirectionConsume, 60));
      this.workerJobNo++;

//      var constructionSiteList = spawns[i].gameSpawn.room.find(FIND_CONSTRUCTION_SITES);

//      for (const constIdx in constructionSiteList) {
//        this.workerJobList.push(new cworkerJob(this.workerJobNo, spawns[i], cworkerJob.jobTypeConstruct, constructionSiteList[constIdx], cworkerJob.jobDirectionConsume, 60));
//        this.workerJobNo++;
//      }

    }
  }

  posToString(obj) {
    var posText;
    if (obj == null) {
      posText = '';
    } else {
      posText = obj.pos.roomName + ' ' + obj.pos.x  + ' ' + obj.pos.y;
    }
    return posText;
  }

  padString(str, padString, length) {
    while (str.length < length)
        str = str + padString;
    return str;
  }

  printJobList() {
    var logtext;
    logtext = '\n                      Worker Job List\n'
            + '---------------------------------------------------------------------------------------------\n'
            + '| ID  | Spawn      | Type       | Target          | Storage         | Direction  | Priority |\n'
            + '---------------------------------------------------------------------------------------------\n';
    for (const i in this.workerJobList) {
      logtext = logtext +
                '| ' + this.padString(String(this.workerJobList[i].jobNo),' ',3)
                + ' | ' + this.padString(this.workerJobList[i].spawn.gameSpawn.name,' ',10)
                + ' | ' + this.padString(cworkerJob.getJobTypeString(this.workerJobList[i].jobType),' ',10)
                + ' | ' + this.padString(this.posToString(this.workerJobList[i].jobTarget) ,' ',15)
                + ' | ' + this.padString(this.posToString(this.workerJobList[i].jobStorage) ,' ',15)
                + ' | ' + this.padString(cworkerJob.getJobDirectionString(this.workerJobList[i].jobDirection) ,' ',10)
                + ' | ' + this.padString(String(this.workerJobList[i].jobPriority) ,' ',8)
                + ' | \n'

    }
    logtext = logtext + '---------------------------------------------------------------------------------------------\n';

    return logtext;
  }

  runJobs(spawn) {

  }

}

module.exports = jobHandler;
