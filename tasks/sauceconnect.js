/*
 * grunt-sauceconnect
 * https://github.com/mrpollo/grunt-sauceconnect
 *
 * Copyright (c) 2014 Ramón Roche, contributors
 * Licensed under the GNU GPL v2 license.
 * https://github.com/mrpollo/grunt-sauceconnect/blob/master/LICENSE
 */

'use strict';

module.exports = function(grunt) {
	var sauce = require('sauce-connect-launcher');
  var async = require('async');

	grunt.registerTask('sauceconnect', 'Grunt task for sauce-connect utility', function(){
		var done = this.async();
		var options = this.options({
			username: false,
			accessKey: false,
			port: 80,
			keepAlive: false
		});
		var triggerError = function(message) {
			grunt.fatal('[SAUCE]: ' + message);
			done();
			return;
		};
		var sauceHandler = function(error, process) {
			if (error) {
				triggerError(error.message);
			}
			grunt.log.ok("[SAUCE]: Sauce Connect ready");
			if (options.keepAlive === false) {
				process.close(function () {
					grunt.log.ok("[SAUCE]: Closed Sauce Connect process");
					done();
				});
			}
		};
		if (options.username === false) {
			triggerError('username needs to be defined');
		}
		if (options.accessKey === false) {
			triggerError('accessKey needs to be defined');
		}

		sauce({username: options.username, accessKey: options.accessKey, port: options.port}, sauceHandler);
	});
};
