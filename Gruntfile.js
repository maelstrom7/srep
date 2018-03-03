module.exports = function(grunt) {
 
    grunt.loadNpmTasks('grunt-screeps-customserver');
 
    grunt.initConfig({
        screeps: {
            options: {
                hostname: '127.0.0.1',
                port: '21025',
                'use-https': false,
                username: 'Maelstrom',
                password: 'test123',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}
