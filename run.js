#!/usr/bin/env node

const argumentate = require('argumentate');

const { options, variables } = argumentate(process.argv.slice(2), {
	y: 'year',
	d: 'day'
});

if(!options.day && !variables[0]) {
	console.log('Day of month is necessary');
	return process.exit(1);
}

if(!options.day && variables[0]) {
	options.day = variables[0];
}

if(!options.year) {
	options.year = (new Date()).getFullYear();
}

let script = require(`./${options.year}/${options.day}/script.js`);

try {
	if(script instanceof Function) {
		let ret =script({ options, variables });
		if(ret !== undefined) {
			console.log('Result:', ret);
		}
	}
} catch(e) {
	console.error(e);
	return process.exit(1);
}
