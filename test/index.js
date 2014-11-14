'use strict';

const expect = require('chai').expect;
const expand = require('../lib/expand');
const co     = require('co');
const path   = require('path');

describe('Initial test',function() {
	before(function() {
		this.txtPath = './fixtures/**/*.txt';
	});

	it('should find 2 txt files with cwd',function(){
		co(function *() {
			var files = yield expand(this.txtPath, {
				cwd: __dirname
			});
			expect(files).to.be.an('array');
			expect(files.length).equal(2);
		}).call(this);
	});

	it('should find 2 txt files without cwd',function(){
		co(function *() {
			var files = yield expand(path.join(__dirname, this.txtPath));
			expect(files).to.be.an('array');
			expect(files.length).equal(2);
		}).call(this);
	});

	it('should find 2 txt files as object prop (with files prop) with cwd',function(){
		co(function *() {
			var files = yield expand({
				'some-dest/some.txt': {
					files: [
						this.txtPath
					]
				}
			}, {
				cwd: __dirname
			});
			expect(files['some-dest/some.txt'].files).to.be.an('array');
			expect(files['some-dest/some.txt'].files.length).equal(2);
		}).call(this);
	});

	it('should find 2 txt files as object prop (without files prop) with cwd',function(){
		co(function *() {
			var files = yield expand({
				'some-dest/some.txt': [
					this.txtPath
				]
			}, {
				cwd: __dirname
			});
			expect(files['some-dest/some.txt']).to.be.an('array');
			expect(files['some-dest/some.txt'].length).equal(2);
		}).call(this);
	});
});