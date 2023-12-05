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

const pad = str => `00${str}`.slice(-2);

let script = require(`./${options.year}/${pad(options.day)}/script.js`);

function log_result(result) {
	if(result instanceof Promise) {
		return result.then(result => {
			console.log('Result:', result);
		});
	}

	if(result !== undefined) {
		console.log('Result:', result);
	}
}

try {
	if(script instanceof Function) {
		const ret = script({ options, variables });
		log_result(ret);
	} else {
		log_result(script)
	}
} catch(e) {
	console.error(e);
	return process.exit(1);
}
