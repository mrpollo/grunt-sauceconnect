module.exports = function(grunt) {
	grunt.initConfig({
		sauceconnect: {
			options: {
				username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
				port: 80,
				keepAlive: true
			},
			default: {}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		}
	});
	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('test', ['jshint']);
};
