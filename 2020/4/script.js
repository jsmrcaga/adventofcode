const path = require('path');
const fs = require('fs');


const REQUIRED_FIELDS = [
	'byr',
	'iyr',
	'eyr',
	'hgt',
	'hcl',
	'ecl',
	'pid',
];

const OPTIONAL_FIELDS = ['cid'];

const valid_year = (val, min, max) => {
	if(val.length !== 4) {
		return false;
	}

	val = +val;
	return val >= min && val <= max;
};

const VALIDATORS = {
	byr: (val) => {
		return valid_year(val, 1902, 2002);
	},
	iyr: (val) => {
		return valid_year(val, 2010, 2020);
	},
	eyr: (val) => {
		return valid_year(val, 2020, 2030)
	},
	hgt: (val) => {
		let unit = val.slice(-2);
		val = +val.replace(unit, '');

		if(unit === 'cm') {
			return val >= 150 && val <= 193;
		}

		return val >= 59 && val <= 76;
	},
	hcl: (val) => {
		return /^#[\dA-Za-z]{6}$/.test(val);
	},
	ecl: (val) => {
		const valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
		return valid.includes(val);	
	},
	pid: (val) => {
		return /^\d{9}$/.test(val)
	},
};

module.exports = ({ options, variables }) => {
	options.input = options.input || 'input.txt';
	options.part = +options.part || 1;

	let input = fs.readFileSync(path.join(__dirname, `./${options.input}`)).toString('utf8');
	// Parse
	let lines = input.split('\n\n').map(line => {
		return line.split(/\s|\n/g).map(doc => {
			return doc.split(':');
		});
	});

	let passports = lines.map(docs => {
		return docs.reduce((acc, [k, v]) => {
			acc[k] = v;
			return acc;
		}, {})
	});

	// Do something
	if(options.part === 1) {
		const validate = (passport) => {
			for(let required of REQUIRED_FIELDS) {
				if(!(required in passport)) {
					return false;
				}
			}
			return true;
		};

		let nb_invalid = 0;
		for(const passport of passports) {
			if(!validate(passport)) {
				nb_invalid++;
			}
		}
		return passports.length - nb_invalid;
	}

	const validate = (passport) => {
		for(let required of REQUIRED_FIELDS) {
			if(!(required in passport)) {
				return false;
			}
		}

		for(let [key, validator] of Object.entries(VALIDATORS)) {
			if(!validator(passport[key])) {
				return false;
			}
		}

		return true;
	};

	return passports.filter(passport => validate(passport)).length;
};
