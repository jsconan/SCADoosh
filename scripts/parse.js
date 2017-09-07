/**
 * @license
 * GPLv3 License
 *
 * Copyright (c) 2017 Jean-Sebastien CONAN
 *
 * This file is part of SCADoosh.
 *
 * SCADoosh is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCADoosh is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCADoosh. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Part of the SCADoosh tool.
 *
 * Applies a grammar analysis on a text and produces an AST.
 *
 * @package scripts
 * @author jsconan
 */

const program = require('commander')
    .version('0.1.0')
    .description('Applies a grammar analysis on a text and produces an AST.')
    .option('-l, --language <name>', 'Set the grammar language')
    .option('-i, --input <file>', 'Set the input file')
    .option('-o, --output <file>', 'Set the output file')
    .option('-p, --pretty', 'Enable pretty print')
    .parse(process.argv);

const fs = require('fs');
const input = program.input ? fs.createReadStream(program.input) : process.stdin;
const output = program.output ? fs.createWriteStream(program.output) : process.stdout;

const nearley = require('nearley');
const grammar = nearley.Grammar.fromCompiled(require('./../src/parser/' + (program.language || 'openscad') + '/grammar'));
const parser = new nearley.Parser(grammar);

input
    .on('data', (data) => parser.feed(data.toString()))
    .on('end', () => output.write(JSON.stringify(parser.results, null, program.pretty ? 4 : 0)));
