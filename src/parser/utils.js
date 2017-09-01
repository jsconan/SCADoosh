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

const _ = require('lodash');
const ast = require('./../ast/ast');
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
     * @param {Function|String} AstNodeClass - The AstNode class or the name of an AST node class or factory
     * @returns {AstFragment}
     * @throws {TypeError} if the created node is not an AstFragment or if the AstNodeClass is not valid
     */
    terminal: (token, value, AstNodeClass) => {
        let factory;

        if (typeof AstNodeClass === 'string') {
            if (ast[AstNodeClass]) {
                factory = ast[AstNodeClass];
            } else if (ast.nodes[AstNodeClass]) {
                factory = (value) => new ast.nodes[AstNodeClass](value);
            } else {
                throw new TypeError('Unknown AST node class ' + AstNodeClass);
            }
        } else {
            if (!_.isFunction(AstNodeClass)) {
                throw new TypeError('AstNodeClass should be a constructor');
            }
            factory = (value) => new AstNodeClass(value);
        }

        const node = factory(value);
        utils.tokenStart(token, node);
        utils.tokenEnd(token, node);
        return node;
    },

    /**
     * Simply unwraps and forwards the data
     * @param {Object|Array} data
     * @returns {Object|Array}
     * @throws {TypeError} if the provided array contains more than one element
     */
    forward: (data) => {
        if (_.isArray(data)) {
            if (data.length > 1) {
                throw new TypeError('Cannot unwrap the data as there is more than one element in the provided array');
            }
            return data[0];
        }
        return data;
    },

    /**
     * Simply discards the data
     * @returns {null}
     */
    discard: () => null
};

module.exports = utils;