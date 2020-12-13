# Advent of Code runner

This repo obviously contains my solutions for [Advent of Code](https://adventofcode.com/)

However, if you want to use it as a template please feel welcome to:
* Clone the repo
* Delete any "year" folders (`./2020` for example)
* Add a folder with the current year
* Add folders with each "day" of the Advent calendar

## Installation
```sh
npm i
```

### Global

You can also install as a global executable with:
```sh
npm i -g
```

> Note that there is no package name after `-g`. This is because you are installing the current directory's package.json package as global (this repo).

## Usage

To run any day on the calendar just run

```sh
node run.js <day>
```

For example:
```sh
node run.js 3
```

if you need to run any specific year

```sh
node run.js 3 -y 2021
```

or

```sh
node run.js 3 --year 2021
```

### Global

If you installed the package globally, you can replace `node run.js` with `advent`.

Example:

```sh
advent 3 --year 2021
```

## Writing your scripts:

Inside every "day" folder you should have a file called `script.js`

> Your scripts _should_ export a function, but if they don't they'll just be run
when `require`d by the runner.

The basic shape of a script looks like this
```js
module.exports = ({ options, variables }) => {
	// do something
	return result;
};
```

Internally the runner uses [argumentate](https://www.npmjs.com/package/argumentate)
to parse options passed from the CLI.

Argumentate exposes `options` (ex: `advent --year` has a `year` option) and `variables` (ex: `advent 3` has a variable called 3).

These are propagated to every script, meaning that you can pass any options and variables you want.

For example
```sh
advent 3 --year 2021 --debug -i 45
```

Would result in

```js
options = {
	year: '2021',
	debug: true,
	i: '45'
};

variables = ['3']
```

> Please note that type casting is not performed automatically. And that option mapping is not available in this repo
