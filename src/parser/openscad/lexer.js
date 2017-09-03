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
const moo = require('moo');

/**
 * Defines the Token descriptor type.
 * @typedef {Object} Token
 * @property {String} type - The name of the group, as passed to compile.
 * @property {String} value - The refined lexeme.
 * @property {String} text - The match contents, before refining.
 * @property {Number} offset - The number of bytes from the start of the buffer where the match starts.
 * @property {Number} lineBreaks - The number of line breaks found in the match. (Always zero if this rule has lineBreaks: false.)
 * @property {Number} line - The line number of the beginning of the match, starting from 1.
 * @property {Number} col - The column where the match begins, starting from 1.
 */

/**
 * Defines the Lexer state type.
 * @typedef {Object} LexerState
 * @property {Number} line - The current line number at the moment of the save.
 * @property {Number} col - The current column number at the moment of the save.
 * @property {String} state - The name of the saved state.
 */

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
 * The actual lexer. It will be wrapped into a delegate object in order to enhance the behavior.
 */
const mooLexer = moo.compile(openScadTokens);

/**
 * Removes the `n` first and the `n` last chars off the value
 * @param {Token} token
 * @param {Number} n
 * @returns {Token}
 */
const trimValue = (token, n) => {
    token.value = token.value.slice(n, -n);
    return token;
};

/**
 * Gets the rest of the value after `n` chars
 * @param {Token} token
 * @param {Number} n
 * @returns {Token}
 */
const restValue = (token, n) => {
    token.value = token.value.substr(n);
    return token;
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
    string: (token) => trimValue(token, 1),

    /**
     * Removes the surrounding brackets from a path lexeme.
     * @param {Token} token
     * @returns {Token}
     */
    path: (token) => trimValue(token, 1),

    /**
     * Removes the surrounding marks from a block comment lexeme.
     * @param {Token} token
     * @returns {Token}
     */
    mcomment: (token) => trimValue(token, 2),

    /**
     * Removes the leading mark from a line comment lexeme.
     * @param {Token} token
     * @returns {Token}
     */
    lcomment: (token) => restValue(token, 2),
};

/**
 * A delegate object that wraps the actual lexer. It will expose the API to the outside.
 */
const lexer = {
    /**
     * Returns a token object, which could have fields for line number, etc.
     * Importantly, a token object must have a value attribute.
     * Some tokens are discarded, like the spaces, in order to simplify the grammar.
     * Some lexeme will be refined to remove the useless data.
     * @returns {Token}
     */
    next: () => {
        let token = mooLexer.next();
        while (typeof token !== "undefined" && _.startsWith(token.type, '_')) {
            token = mooLexer.next();
        }
        if (token && refinery[token.type]) {
            return refinery[token.type](token);
        }
        return token;
    },

    /**
     * Returns an info object that describes the current state of the lexer.
     * Straight call to the delegated lexer.
     * @returns {LexerState}
     */
    save: () => {
        return mooLexer.save();
    },

    /**
     * Sets the internal buffer of the lexer to chunk,
     * and restores its state to a state returned by save().
     * Straight call to the delegated lexer.
     * @param {String} chunk
     * @param {LexerState} [info]
     */
    reset: (chunk, info) => {
        return mooLexer.reset(chunk, info);
    },

    /**
     * Returns a string with an error message describing a parse error at that token
     * (for example, the string might contain the line and column where the error was found).
     * Straight call to the delegated lexer.
     * @param {Token} token
     * @param {String} message
     * @returns {String}
     */
    formatError: (token, message) => {
        return mooLexer.formatError(token, message);
    },

    /**
     * Returns true if the lexer can emit tokens with that name.
     * Straight call to the delegated lexer.
     * @param {String} name
     * @returns {Boolean}
     */
    has: (name) => {
        return mooLexer.has(name);
    }
};

module.exports = lexer;
