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
 * Defines some parser utils.
 *
 * @package src/parser
 * @author jsconan
 */

const _ = require("lodash");
const AstFragment = require('./../ast/fragment');
const splitLines = require('./../utils/split-lines');

/**
 * Defines some parser utils.
 * @type {Object}
 */
const utils = {
    /**
     * Forwards the token position into the provided AstFragment as a start position
     * @param {Object} token
     * @param {AstFragment} node
     * @returns {AstFragment}
     * @throws {TypeError} if the node is not an AstFragment
     */
    tokenStart: (token, node) => {
        if (!node || !(node instanceof AstFragment)) {
            throw new TypeError('An AstFragment node is needed to set the position');
        }
        return node.startAt(token.line, token.col, token.offset);
    },

    /**
     * Forwards the token position into the provided AstFragment as an end position
     * @param {Object} token
     * @param {AstFragment} node
     * @returns AstFragment
     * @throws {TypeError} if the node is not an AstFragment
     */
    tokenEnd: (token, node) => {
        if (!node || !(node instanceof AstFragment)) {
            throw new TypeError('An AstFragment node is needed to set the position');
        }

        const value = token.value;
        const lines = splitLines(value);
        const breaks = lines.length - 1;
        const col = breaks ? 1 + lines[breaks].length : token.col + value.length;
        return node.endAt(token.line + breaks, col, token.offset + value.length);
    },

    /**
     * Creates a terminal node from the provided token and class.
     * Set the fragment position according to the provided token.
     * @param {Object} token - The token that represents the terminal
     * @param {String} value - The refined token value
     * @param {Function} AstNodeClass - The AstNode class
     * @returns {AstFragment}
     * @throws {TypeError} if the created node is not an AstFragment
     */
    terminal: (token, value, AstNodeClass) => {
        const node = new AstNodeClass(value);
        utils.tokenStart(token, node);
        utils.tokenEnd(token, node);
        return node;
    },

    /**
     * Simply unwraps and forwards the data
     * @param {Object|Array} data
     * @returns {Object|Array}
     */
    forward: (data) => _.isArray(data) ? data[0] : data,

    /**
     * Simply discards the token
     * @returns {null}
     */
    discard: () => null,
};

module.exports = utils;