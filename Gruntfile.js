module.exports = function(grunt) {
    var config = require('./.screeps.json') 
    grunt.loadNpmTasks('grunt-screeps-customserver');
 
    grunt.initConfig({
        screeps: {
            options: {
                hostname: config.hostname,
                port: config.port,
                'use-https': false,
                username: config.username,
                password: config.password,
                branch: config.branch,
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}
