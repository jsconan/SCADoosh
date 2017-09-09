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
const classes = require('./classes');

/**
 * Defines some AST utility helpers.
 * @type {Object}
 */
const utils = {
    /**
     * Creates a node that represents a literal from the provided data and class.
     * Set the fragment position according to the provided token.
     * @param {Array|Token|AstNode} data - The data provided by the parser
     * @param {Function|String} AstClass - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     * @throws {TypeError} if there is more than one token
     * @throws {TypeError} if if the AstClass is not valid
     * @throws {TypeError} if the created node is not an AstFragment
     */
    literal: (data, AstClass) => {
        data = utils.flatten(data);

        if (!data.length || data.length > 1) {
            throw new TypeError('A literal should be represented by a single token');
        }

        const token = data[0];

        if (utils.is(token, AstClass)) {
            return token;
        }

        const Class = utils.getClass(AstClass);
        const node = new Class(token.value);

        if (!utils.is(node, classes.AstFragment)) {
            throw new TypeError('A literal should be at least an AstFragment');
        }

        return utils.setPosition(node, data);
    },

    /**
     * Checks if an object is an instance of an AST node.
     * @param {Object} node
     * @param {Function|String|AstNode} AstClass
     * @returns {Boolean}
     */
    is: (node, AstClass) => {
        if (typeof AstClass === 'string') {
            AstClass = classes[AstClass] || _.noop;
        }
        return typeof node === 'object' && node instanceof AstClass;
    },

    /**
     * Gets an AST node class.
     * @param {String|Function} AstClass
     * @returns {Function}
     * @throws {TypeError} if the AstClass is not valid
     */
    getClass: (AstClass) => {
        if (!AstClass) {
            throw new TypeError(`Missing class or class name!`);
        }

        if (typeof AstClass === 'string') {
            if (classes[AstClass]) {
                AstClass = classes[AstClass];
            } else {
                throw new TypeError(`Unknown AST node class ${AstClass}`);
            }
        }

        if (typeof AstClass !== 'function') {
            throw new TypeError('AstClass should be a constructor');
        }

        return AstClass;
    },

    /**
     * Creates an AstPosition from a start token.
     * @param {Token|AstFragment} token
     * @returns {AstPosition}
     * @throws {TypeError} if the token is not valid
     */
    startPosition: (token) => {
        token = _.isObject(token) ? token : {};

        if (utils.is(token, classes.AstFragment)) {
            return token.start;
        }

        return new classes.AstPosition(token.line, token.col, token.offset);
    },

    /**
     * Creates an AstPosition from an end token.
     * @param {Token|AstFragment} token
     * @returns {AstPosition}
     * @throws {TypeError} if the token is not valid
     */
    endPosition: (token) => {
        token = _.isObject(token) ? token : {};

        if (utils.is(token, classes.AstFragment)) {
            return token.end;
        }

        const value = '' + token.text;
        const lines = splitLines(value);
        const breaks = lines.length - 1;
        const col = breaks ? 1 + lines[breaks].length : token.col + value.length;

        return new classes.AstPosition(token.line + breaks, col, token.offset + value.length);
    },

    /**
     * Sets the position of an AST fragment according to the surrounding tokens
     * @param {AstFragment} node
     * @param {Array} data
     * @throws {TypeError} if the provided node is not an AstFragment
     */
    setPosition: (node, data) => {
        if (!utils.is(node, classes.AstFragment)) {
            throw new TypeError('Only AstFragment instances can be positioned!');
        }
        return node
            .startAt(utils.startPosition(utils.head(data)))
            .endAt(utils.endPosition(utils.tail(data)))
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
        data = utils.flatten(data);
        if (data.length === 3) {
            let [left, node, right] = data;

            if (!utils.is(node, classes.AstFragment)) {
                throw new TypeError('Only AstFragment instances can be surrounded!');
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
     * Simply unwraps and forwards the element in data.
     * @param {Object|Array} data
     * @returns {Object|Array}
     * @throws {TypeError} if the provided array contains more than one element
     */
    forward: (data) => {
        if (_.isArray(data)) {
            data = utils.flatten(data);
            if (data.length > 1) {
                throw new TypeError(`Only a single element can be forwarded, ${data.length} elements found!`);
            }
            return data[0];
        }
        return data;
    },

    /**
     * Simply unwraps and forwards the first element in data.
     * It will update the position of the node accordingly to the discarded elements.
     * @param {Object|Array} data
     * @returns {Object|Array}
     */
    head: (data) => {
        if (_.isArray(data)) {
            data = utils.flatten(data);
            let first = data[0];
            if (utils.is(first, classes.AstFragment) && data.length > 1) {
                first = first.clone({
                    end: utils.endPosition(data[data.length - 1])
                });
            }
            return first;
        }
        return data;
    },

    /**
     * Simply unwraps and forwards the last element in data.
     * It will update the position of the node accordingly to the discarded elements.
     * @param {Object|Array} data
     * @returns {Object|Array}
     */
    tail: (data) => {
        if (_.isArray(data)) {
            data = utils.flatten(data);

            let last = data[data.length - 1];
            if (utils.is(last, classes.AstFragment) && data.length > 1) {
                last = last.clone({
                    start: utils.startPosition(data[0])
                });
            }
            return last;
        }
        return data;
    },

    /**
     * Ensures the provided data is an array and have only one dimension.
     * @param {Array|Object} data
     * @returns {Array}
     */
    flatten: (data) => _.isArray(data) ? _.flattenDeep(data) : [data],

    /**
     * Ensures the provided data is an array and only contains AST nodes
     * @param {Array|Object} data
     * @returns {AstFragment[]}
     */
    compact: (data) => _.filter(utils.flatten(data), (node) => utils.is(node, classes.AstFragment)),

    /**
     * Simply discards the data.
     * @returns {null}
     */
    discard: () => null,

    /**
     * Creates a debug node that contains the data.
     * @param {Object|Array} data
     * @returns {AstFragment}
     */
    debug: (data) => {
        const node = new classes.AstFragment({
            type: 'debug',
            data: data
        });

        if (data && data.length) {
            utils.setPosition(node, data);
        } else {
            node.startAt(1, 1, 0).endAt(1, 1, 0);
        }

        return node;
    }
};

module.exports = utils;
