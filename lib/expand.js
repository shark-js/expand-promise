'use strict';

const grunt = require('grunt');
const util  = require('util');

function expand() {
	return grunt.file.expand.apply(grunt.file, arguments);
}

module.exports = function() {
	var args = [].slice.call(arguments, 0),
		data = args[0],
		options = args[1] || {};
	return function(done) {
		if (!util.isArray(data) && typeof data === 'object') {
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					/* { 'path/to/dest': { options: {}, files: ['array/', 'of/', 'paths/'] } */
					if (data[key] && data[key].files) {
						data[key].files = expand.call(null, options, data[key].files);
					}
					/* { 'path/to/dest': ['array/', 'of/', 'paths'] */
					else {
						data[key] = expand.call(null, options, data[key]);
					}
				}
			}
			done(null, data);
		}
		else {
			done(null, expand.call(null, options, data));
		}
	};
};