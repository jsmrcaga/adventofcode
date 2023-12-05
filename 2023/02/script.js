const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const CONSTRAINTS = {
	red: 12,
	green: 13,
	blue: 14,
};

class Reveal {
	constructor({ red=0, blue=0, green=0 } = {}) {
		this.red = red;
		this.blue = blue;
		this.green = green;
	}

	static parse_reveal(reveal_line) {
		const results = {};
		const colors = reveal_line.split(',');
		for(const color_reveal of colors) {
			const [number, color] = color_reveal.trim().split(' ');
			results[color.trim()] = Number.parseInt(number.trim(), 10);
		}

		return new this(results);
	}
}

class Game {
	constructor({ id, reveals=[] } = {}) {
		if(!id) {
			throw new Error('id is mandatory');
		}
		this.id = Number.parseInt(id, 10);
		this.reveals = reveals;
	}

	max(color) {
		const color_reveals = this.reveals.map(reveal => reveal[color]);
		return Math.max(...color_reveals);
	}

	is_possible(colors = {}) {
		for(const color of Object.keys(CONSTRAINTS)) {
			if(this.max(color) > colors[color]) {
				return false;
			}
		}

		return true;
	}

	static parse_game(line) {
		const [game, all_reveals_line] = line.split(':');
		const id = game.replace('Game', '').trim();
		const reveal_lines = all_reveals_line.trim().split(';');
		const reveals = reveal_lines.map(reveal_line => Reveal.parse_reveal(reveal_line));

		return new this({
			id,
			reveals
		});
	}
}


function script() {
	const reader = readline.createInterface({
		input: fs.createReadStream(path.join(__dirname, './input.txt'))
	});

	let sum = 0;
	reader.on('line', line => {
		const game = Game.parse_game(line);
		if(game.is_possible(CONSTRAINTS)) {
			sum += game.id;
		}
	});

	return new Promise((resolve, reject) => {
		reader.on('close', () => {
			resolve(sum);
		});
	});
}

module.exports = script;
