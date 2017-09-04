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
 * Lexical analyzer that recognizes the tokens of the OpenSCAD language.
 *
 * @package src/parser/openscad
 * @author jsconan
 */

const _ = require('lodash');
const Lexer = require('./../lexer');

/**
 * The list of keywords comprised by the OpenSCAD language.
 */
const openScadKeywords = [
    'use',
    'include',
    'module',
    'function',
    'if',
    'else',
    'for',
    'let',
    'true',
    'false',
    'undef'
];

/**
 * Defines the patterns that recognize the tokens of the OpenSCAD language.
 */
const openScadTokens = {
    // discarded tokens: spaces
    _space: {
        match: /\s+/,
        lineBreaks: true
    },

    // literals and keywords
    number: /[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/,
    string: /"(?:\\.|[^"\\])*"/,
    path: /<[^\t\r\n>]+>/,
    identifier: {
        match: /\$?[a-zA-Z0-9_]+/,
        keywords: _(openScadKeywords).map(k => [k, k]).fromPairs().value()
    },

    // comments
    mcomment: {
        match: /\/\*(?:[\s\S]*?)\*\//,
        lineBreaks: true
    },
    lcomment: /\/\/.*?$/,

    // punctuation
    dot: '.',
    comma: ',',
    semicolon: ';',
    colon: ':',

    lbrace: '{',
    rbrace: '}',
    lparen: '(',
    rparen: ')',
    lsquare: '[',
    rsquare: ']',

    // operators
    lesserequal: '<=',
    lesserthan: '<',
    greaterequal: '>=',
    greaterthan: '>',
    equal: '==',
    notequal: '!=',

    assign: '=',
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/',
    modulo: '%',

    cond: '?',
    and: '&&',
    or: '||',
    not: '!',

    debug: '#',
};

/**
 * List of functions that will be invoked to refine particular token values.
 * @type {Object}
 */
const refinery = {
    /**
     * Removes the surrounding quotes from a string lexeme.
     * @param {Token} token
     * @returns {Token}
     */
    string: (token) => Lexer.crop(token, 1),

    /**
     * Removes the surrounding brackets from a path lexeme.
     * @param {Token} token
     * @returns {Token}
     */
    path: (token) => Lexer.crop(token, 1),

    /**
     * Removes the surrounding marks from a block comment lexeme.
     * @param {Token} token
     * @returns {Token}
     */
    mcomment: (token) => Lexer.crop(token, 2),

    /**
     * Removes the leading mark from a line comment lexeme.
     * @param {Token} token
     * @returns {Token}
     */
    lcomment: (token) => Lexer.cropLeft(token, 2),
};

/**
 * Lexical analyzer that recognizes the tokens of the OpenSCAD language.
 * @param {String} [input] - The initial internal buffer of the lexer.
 * @returns {Lexer}
 */
function openScadLexer(input) {
    const lexer = new Lexer(openScadTokens, refinery);

    if (input) {
        lexer.reset(input);
    }

    return lexer;
}

module.exports = openScadLexer;
