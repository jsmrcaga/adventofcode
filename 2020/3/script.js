const path = require('path');
const fs = require('fs');

// right 3 and down 1
let MOVEMENTS = [{
	COLS: 3,
	ROWS: 1
}, {
	COLS: 1,
	ROWS: 1
}, {
	COLS: 5,
	ROWS: 1
}, {
	COLS: 7,
	ROWS: 1
}, {
	COLS: 1,
	ROWS: 2
}];

function check_slope(lines, MOVEMENT) {
	let row = 0;
	let column = 0;
	let trees = 0;

	let trees_index = [];

	while(row < lines.length) {
		let current_row = lines[row];

		// Reset because of repeating pattern
		if(!current_row[column]) {
			let max_col = lines[0].length;
			let offset = column - max_col;
			column = offset;
		}

		let tree = current_row[column];
		if(tree === '#') {
			trees_index.push({ column, row });
			trees++;
		}

		column += MOVEMENT.COLS;
		row += MOVEMENT.ROWS;
	}

	return trees;
}

module.exports = ({ options, variables }) => {
	let input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf8');


	let lines = input.split('\n').map(line => line.split(''));

	if(!('part' in options)) {
		options.part = 1;
	} else {
		options.part = +options.part;
	}

	if(options.part === 1) {
		return check_slope(lines, MOVEMENTS[0]);
	} else {
		return MOVEMENTS.map(mv => check_slope(lines, mv)).reduce((acc, val) => acc * val, 1);
	}
}
