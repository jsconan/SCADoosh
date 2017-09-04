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
 * Lexical analyzer that recognizes the tokens of the target language.
 *
 * @package src/parser
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
 * Defines a lexical analyzer that recognizes the tokens of the target language.
 */
class Lexer {
    /**
     * Creates a lexical analyser that will recognize the provided rules.
     * @param {Object} rules - The rules to match
     * @param {Object} [refinery] - An optional list of functions that will refine the matched values
     */
    constructor(rules, refinery) {
        Object.defineProperties(this, {
            // the actual lexer that will be delegated through the exposed API
            lexer: {
                value: moo.compile(rules),
                configurable: false,
                enumerable: true,
                writable: false
            },

            // the optional list of functions that will be called to refine the matched values
            refinery: {
                value: _.isObject(refinery) ? refinery : {},
                configurable: false,
                enumerable: true,
                writable: false
            }
        });
    }

    /**
     * Returns a token object, which could have fields for line number, etc.
     * Importantly, a token object must have a value attribute.
     * Some tokens may be discarded, if the name starts with a _.
     * Some lexemes will be refined to remove the useless data or to convert the value.
     * @returns {Token}
     */
    next() {
        let token = this.lexer.next();
        while (typeof token !== 'undefined' && _.startsWith(token.type, '_')) {
            token = this.lexer.next();
        }
        if (token && this.refinery[token.type]) {
            return this.refinery[token.type](token);
        }
        return token;
    }

    /**
     * Returns an info object that describes the current state of the lexer.
     * Straight call to the delegated lexer.
     * @returns {LexerState}
     */
    save() {
        return this.lexer.save();
    }

    /**
     * Sets the internal buffer of the lexer to chunk,
     * and restores its state to a state returned by save().
     * Straight call to the delegated lexer.
     * @param {String} chunk
     * @param {LexerState} [info]
     */
    reset(chunk, info) {
        return this.lexer.reset(chunk, info);
    }

    /**
     * Returns a string with an error message describing a parse error at that token
     * (for example, the string might contain the line and column where the error was found).
     * Straight call to the delegated lexer.
     * @param {Token} token
     * @param {String} message
     * @returns {String}
     */
    formatError(token, message) {
        return this.lexer.formatError(token, message);
    }

    /**
     * Returns true if the lexer can emit tokens with that name.
     * Straight call to the delegated lexer.
     * @param {String} name
     * @returns {Boolean}
     */
    has(name) {
        return this.lexer.has(name);
    }


    /**
     * Helper that removes the `n` first and the `n` last chars off the value
     * @param {Token} token
     * @param {Number} n
     * @returns {Token}
     */
    static crop(token, n) {
        token.value = token.value.slice(n, -n);
        return token;
    }

    /**
     * Helper that removes the `n` first chars off the value
     * @param {Token} token
     * @param {Number} n
     * @returns {Token}
     */
    static cropLeft(token, n) {
        token.value = token.value.substr(n);
        return token;
    }

    /**
     * Helper that removes the `n` last chars off the value
     * @param {Token} token
     * @param {Number} n
     * @returns {Token}
     */
    static cropRight(token, n) {
        token.value = token.value.slice(0, -n);
        return token;
    }

    /**
     * Helper that converts the value to number
     * @param {Token} token
     * @returns {Token}
     */
    static numeric(token) {
        token.value = parseFloat(token.value);
        return token;
    }
}

module.exports = Lexer;
