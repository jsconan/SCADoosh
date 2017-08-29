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
 * Defines the grammar postprocessors for the OpenSCAD language parser.
 *
 * @package src/parser/openscad
 * @author jsconan
 */

const _ = require("lodash");

const reLineBreak = /\r\n?|\n/;
const reBlockComment = /\/\*\**(?:\s*?(?:\r\n?|\n))?((?:.|[\r\n])*?)(?:(?:\r\n?|\n)\s*)?\**\*\//;
const reBlockCommentSide = /\s*\*+/;

/**
 * Gets the type of a token
 * @param {Object} token
 * @returns {String}
 */
function tokenType(token) {
    return token[0].type;
}

/**
 * Gets the value of a token
 * @param {Object} token
 * @returns {String}
 */
function tokenValue(token) {
    return token[0].value;
}

module.exports = {
    /**
     * Parses a number
     * @param {Object} token
     * @returns {Object}
     */
    number: (token) => ({
        type: 'number',
        value: parseFloat(tokenValue(token))
    }),

    /**
     * Parses a string
     * @param {Object} token
     * @returns {Object}
     */
    string: (token) => ({
        type: 'string',
        value: _.trim(tokenValue(token), '"')
    }),

    /**
     * Parses a path
     * @param {Object} token
     * @returns {Object}
     */
    path: (token) => ({
        type: 'path',
        value: _.trim(tokenValue(token), '<>')
    }),

    /**
     * Parses the boolean keywords
     * @param {Object} token
     * @returns {Object}
     */
    bool: (token) => ({
        type: 'boolean',
        value: tokenValue(token) === 'true'
    }),

    /**
     * Parses the "undef" keyword
     * @param {Object} token
     * @returns {Object}
     */
    undef: (token) => ({
        type: 'undefined',
        value: null
    }),

    /**
     * Parses an identifier
     * @param {Object} token
     * @returns {Object}
     */
    identifier: (token) => ({
        type: tokenType(token),
        value: tokenValue(token)
    }),

    /**
     * Parses a line comment
     * @param {Object} token
     * @returns {Object}
     */
    lcomment: (token) => ({
        type: 'comment',
        value: _.trimStart(tokenValue(token), '/ \t')
    }),

    /**
     * Parses a multi-lines comment
     * @param {Object} token
     * @returns {Object}
     */
    mcomment: (token) => ({
        type: 'comment',
        value: _(tokenValue(token).replace(reBlockComment, '$1').split(reLineBreak)).map((line) => {
            return line.replace(reBlockCommentSide, '');
        }).value()
    }),

    /**
     * Simply discards the token
     * @returns {null}
     */
    discard: () => null,
};
