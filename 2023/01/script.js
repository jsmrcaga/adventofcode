const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

function find_first_int_int() {
	const parsed = Number.parseInt(str[char_index], 10);
	if(!Number.isNaN(parsed)) {
		return parsed;
	}

	return null;
}

const NUMBERS = Object.entries({
	'one': 1,
	'two': 2,
	'three': 3,
	'four': 4,
	'five': 5,
	'six': 6,
	'seven': 7,
	'eight': 8,
	'nine': 9
});

function is_char_int(char) {
	return !Number.isNaN(Number.parseInt(char, 10));
}

function get_char_number_string(str, index) {
	for(const [name, int] of NUMBERS) {
		if(str.substr(index).indexOf(name) === 0) {
			return int;
		}
	}

	return null;
}


function find_first_int(str, reversed=false) {
	for(let i = 0; i < str.length; i++) {
		const char_index = reversed ? (str.length - i - 1) : i;
		if(is_char_int(str[char_index])) {
			return str[char_index];
		}

		const string_number = get_char_number_string(str, char_index)
		if(string_number) {
			return string_number;
		}
		
	}
}


function script() {
	const reader = readline.createInterface({
		input: fs.createReadStream(path.join(__dirname, './input.txt'))
	});

	let sum = 0;

	reader.on('line', line => {
		// we can optimize by looping from start
		// and then from end, effectively cutting the middle
		const first_int = find_first_int(line);
		const last_int = find_first_int(line, true);
		sum += Number.parseInt(`${first_int}${last_int}`);
	});

	return new Promise((resolve, reject) => {
		reader.on('close', () => {
			resolve(sum);
		});
	});
}

module.exports = script;
