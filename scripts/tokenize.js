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
 * Applies a lexical analysis on a text and extracts tokens.
 *
 * @package scripts
 * @author jsconan
 */

const program = require('commander')
    .version('0.1.0')
    .description('Applies a lexical analysis on a text and extracts tokens.')
    .option('-l, --language <name>', 'Set the lexer language')
    .option('-i, --input <file>', 'Set the input file')
    .option('-o, --output <file>', 'Set the output file')
    .option('-p, --pretty', 'Enable pretty print')
    .parse(process.argv);

const fs = require('fs');
const input = program.input ? fs.createReadStream(program.input) : process.stdin;
const output = program.output ? fs.createWriteStream(program.output) : process.stdout;

const openScadLexer = require('./../src/parser/' + (program.language || 'openscad') + '/lexer');
const lexer = openScadLexer();

let started = false;
let lastOffset = 0;
let lastText = '';

/**
 * Gets the index of the last space in a text.
 * @param {String} text
 * @returns {Number}
 */
function indexOfLastSpace(text) {
    for (let index = text.length - 1; index >= 0; index--) {
        if (text.charCodeAt(index) <= 32) {
            return index;
        }
    }
    return -1;
}

/**
 * Tokenizes a chunk of text.
 * @param {String} text
 * @param {Boolean} end
 */
function parse(text, end) {
    if (text) {
        let token;

        lexer.reset(text, lexer.save());

        while (token = lexer.next()) {
            token.offset += lastOffset;
            output.write((started ? ',' : '[') + JSON.stringify(token, null, program.pretty ? 4 : 0));
            started = true;
        }

        lastOffset += text.length;
    }

    if (!text || end) {
        output.write(']\n');
        started = false;
    }
}

/**
 * Reads text from the input stream. Parse the chunk as soon as it is possible,
 * then write the result in the output stream.
 * @param {Buffer|String} data
 */
function read(data = null) {
    let text = '';

    if (data) {
        data = data.toString();
        let lastSpaceIndex = indexOfLastSpace(data) + 1;
        if (lastSpaceIndex > 0) {
            text = lastText + data.slice(0, lastSpaceIndex);
            lastText = data.substr(lastSpaceIndex);
        } else {
            lastText += data;
        }
    } else {
        text = lastText;
        lastText = '';
    }

    parse(text, !data);
}

input
    .on('data', (data) => read(data))
    .on('end', () => read());
