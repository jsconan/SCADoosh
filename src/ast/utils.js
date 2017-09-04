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
 * Defines some AST utility helpers.
 *
 * @package src/ast
 * @author jsconan
 */

const _ = require('lodash');
const splitLines = require('./../utils/strings').splitLines;
const ast = require('./ast');
const nodes = ast.nodes;

const AstPosition = require('./position');
const AstFragment = require('./fragment');

/**
 * Defines some AST utility helpers.
 * @type {Object}
 */
const utils = {
    /**
     * Checks if an object is an instance of an AST node.
     * @param {Object} node
     * @param {Function|String} AstClass
     * @returns {Boolean}
     */
    is: (node, AstClass) => {
        if (typeof AstClass === 'string') {
            AstClass = nodes[AstClass] || _.noop;
        }
        return typeof node === 'object' && node instanceof AstClass;
    },

    /**
     * Creates an AstPosition from a start token.
     * @param {Token|AstFragment} token
     * @returns {AstPosition}
     * @throws {TypeError} if the token is not valid
     */
    startPosition: (token) => {
        token = _.isObject(token) ? token : {};

        if (utils.is(token, AstFragment)) {
            return token.start;
        }

        return new AstPosition(token.line, token.col, token.offset);
    },

    /**
     * Creates an AstPosition from an end token.
     * @param {Token|AstFragment} token
     * @returns {AstPosition}
     * @throws {TypeError} if the token is not valid
     */
    endPosition: (token) => {
        token = _.isObject(token) ? token : {};

        if (utils.is(token, AstFragment)) {
            return token.end;
        }

        const value = '' + token.text;
        const lines = splitLines(value);
        const breaks = lines.length - 1;
        const col = breaks ? 1 + lines[breaks].length : token.col + value.length;

        return new AstPosition(token.line + breaks, col, token.offset + value.length);
    },

    /**
     * Takes care of an AST node surrounded by tokens.
     * It will update the position of the node accordingly, then return the node.
     * @param {Object|Array} data
     * @returns {AstFragment}
     * @throws {TypeError} if the provided array does not contain the right number of elements,
     *                     or if the resulting object is not an AstFragment
     */
    surrounded: (data) => {
        data = _.isArray(data) ? _.flattenDeep(data) : data;
        if (data.length === 3) {
            let [left, node, right] = data;

            if (!utils.is(node, AstFragment)) {
                throw new TypeError('Only a AstFragment instances can be surrounded!');
            }

            if (!_.isObject(left) || !_.isObject(right)) {
                throw new TypeError('The surrounding elements are not valid tokens!');
            }

            return node.clone({
                start: utils.startPosition(left),
                end: utils.endPosition(right)
            });
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Simply unwraps and forwards the element in data
     * @param {Object|Array} data
     * @returns {Object|Array}
     * @throws {TypeError} if the provided array contains more than one element
     */
    forward: (data) => {
        if (_.isArray(data)) {
            if (data.length > 1) {
                throw new TypeError(`Only a single element can be forwarded, ${data.length} elements found!`);
            }
            return data[0];
        }
        return data;
    },

    /**
     * Simply unwraps and forwards the first element in data
     * @param {Object|Array} data
     * @returns {Object|Array}
     */
    head: (data) => {
        if (_.isArray(data)) {
            return data[0];
        }
        return data;
    },

    /**
     * Simply unwraps and forwards the last element in data
     * @param {Object|Array} data
     * @returns {Object|Array}
     */
    tail: (data) => {
        if (_.isArray(data)) {
            return data[data.length - 1];
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
