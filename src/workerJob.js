const spawn = require('spawn');

class workerJob {
//  var _workerJobNo,
//  var _workerJobType,
//  var _workerJobTarget,
//  var _workerJobStorage,
//  var _workerJobDirection,
//  var _workerJobCreepsAssigned,

// Job Type List
  static jobTypeHarvest() { return 'H'; }
  static jobTypeConstruct() { return 'C'; }
  static jobTypeUpgrade() { return 'U'; }

// Job Direction
  static jobDirectionGather() { return 'G'; }
  static jobDirectionConsume() { return 'C'; }



  constructor (jobNo, spawn, jobType, jobTarget, jobDirection, jobPriority, jobAllocationGroup, jobStorage) {
    this.jobNo = jobNo;
    this.jobType = jobType;
    this.jobTarget = jobTarget;
    this.jobStorage = jobStorage;
    this.jobDirection = jobDirection;
    this.jobPriority = jobPriority;
    this.jobAllocationGroup = jobAllocationGroup;
    this.spawn = spawn;
  }

  doBasicJob(creep) {
      // Check if creep has at least one worker/move/carry parts oherwise suicide or recycle

      if(creep.carry.energy < creep.carryCapacity) {
          var sources = creep.room.find(FIND_SOURCES);
          if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
          }
      }
      else {
          var targets = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                  return (structure.structureType == STRUCTURE_SPAWN) &&
                      structure.energy < structure.energyCapacity;
              }
          });
          if(targets.length > 0) {
              if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
              }
          }
      }
  }

  createWorker(spawn) {
    var newName = 'Basic' + Game.time;

    //var vspawn = spawn.gameSpawn;

    spawn.spawnCreep([WORK,WORK,CARRY,MOVE], newName);
  }

  static getJobTypeString(jobType) {
    var jobTypeString;

    switch (jobType) {
      case this.jobTypeHarvest :
        jobTypeString = 'Harvest';
        break;
      case this.jobTypeConstruct :
        jobTypeString = 'Construct';
        break;
      case this.jobTypeUpgrade :
        jobTypeString = 'Upgrade';
        break;
      default :
        jobTypeString = 'Invalid Type';
    }
    return jobTypeString
  }

  static jobDirectionGather() { return 'G'; }
  static jobDirectionComsume() { return 'C'; }

  static getJobDirectionString(jobDirection) {
    var jobDirectionString;

    switch (jobDirection) {
      case this.jobDirectionGather :
        jobDirectionString = 'Gather';
        break;
      case this.jobDirectionConsume :
        jobDirectionString = 'Consume';
        break;
      default :
        jobDirectionString = 'Invalid Direction';
    }
    return jobDirectionString
  }

}

module.exports = workerJob;
