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

const _ = require("lodash");
const moo = require("moo");

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
    // discarded tokens: spaces, empty comments
    _comment: /(?:\/\/[/*-=_^~#@$\s]*?$|\/\*(?:[/*-=_^~#@$\s]*?)\*\/)/,
    _space: {
        match: /\s+/,
        lineBreaks: true
    },

    // values and identifiers
    number: /[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/,
    string: /"(?:\\.|[^"\\])*"/,
    path: /<[^\t\r\n>]+>/,
    identifier: {
        match: /\$?[a-zA-Z0-9_]+/,
        keywords: _(openScadKeywords).map(k => [k, k]).fromPairs().value()
    },

    // comments
    mcomment: /\/\*(?:[\s\S]*?)\*\//,
    lcomment: /\/\/.*?$/,

    // punctuation and operators
    dot: '.',
    comma: ',',
    semicolon: ';',
    colon: ':',
    cond: '?',

    lbrace: '{',
    rbrace: '}',
    lparen: '(',
    rparen: ')',
    lsquare: '[',
    rsquare: ']',

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
 * A delegate object that wraps the actual lexer. It will expose the API to the outside.
 */
const lexer = {
    /**
     * Returns a token object, which could have fields for line number, etc.
     * Importantly, a token object must have a value attribute.
     * Some tokens are discarded, like the spaces, in order to simplify the grammar.
     */
    next: function next() {
        var token = mooLexer.next();
        while (typeof token !== "undefined" && _.startsWith(token.type, '_')) {
          token = mooLexer.next();
        }
        return token;
    },

    /**
     * Returns an info object that describes the current state of the lexer.
     * Straight call to the delegated lexer.
     */
    save: function save() {
        return mooLexer.save();
    },

    /**
     * Sets the internal buffer of the lexer to chunk,
     * and restores its state to a state returned by save().
     * Straight call to the delegated lexer.
     */
    reset: function reset(chunk, info) {
        return mooLexer.reset(chunk, info);
    },
    /**
     * Returns a string with an error message describing a parse error at that token
     * (for example, the string might contain the line and column where the error was found).
     * Straight call to the delegated lexer.
     */
    formatError: function formatError(token) {
        return mooLexer.formatError(token);
    },

    /**
     * Returns true if the lexer can emit tokens with that name.
     * Straight call to the delegated lexer.
     */
    has: function has(name) {
        return mooLexer.has(name);
    }
};

module.exports = lexer;
