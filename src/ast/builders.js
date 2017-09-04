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
 * Defines the builders that will produce the AST nodes from the language parser.
 *
 * @package src/ast
 * @author jsconan
 */

const _ = require('lodash');
const utils = require('./utils');
const ast = require('./ast');
const nodes = ast.nodes;

const builders = {
    /**
     * Creates a terminal node from the provided token and class.
     * Set the fragment position according to the provided token.
     * @param {Token} token - The token that represents the terminal
     * @param {Function|String} AstNodeClass - The AstNode class or the name of an AST node class or factory
     * @returns {AstFragment}
     * @throws {TypeError} if the created node is not an AstFragment or if the AstNodeClass is not valid
     */
    terminal: (token, AstNodeClass) => {
        const value = token.value;
        let factory;

        if (typeof AstNodeClass === 'string') {
            if (ast[AstNodeClass]) {
                factory = ast[AstNodeClass];
            } else if (nodes[AstNodeClass]) {
                factory = (value) => new nodes[AstNodeClass](value);
            } else {
                throw new TypeError(`Unknown AST node class ${AstNodeClass}`);
            }
        } else {
            if (!_.isFunction(AstNodeClass)) {
                throw new TypeError('AstNodeClass should be a constructor');
            }
            factory = (value) => new AstNodeClass(value);
        }

        const node = factory(value);

        if (!utils.is(node, nodes.AstFragment)) {
            throw new TypeError('A terminal should be An AstFragment');
        }

        node.startAt(utils.startPosition(token));
        node.endAt(utils.endPosition(token));

        return node;
    },

    /**
     * Processes a number
     * @param {Array} data
     * @returns {AstNumber}
     */
    number: (data) => builders.terminal(utils.forward(data), 'number'),

    /**
     * Processes a string
     * @param {Array} data
     * @returns {AstString}
     */
    string: (data) => builders.terminal(utils.forward(data), 'string'),

    /**
     * Processes a path
     * @param {Array} data
     * @returns {AstPath}
     */
    path: (data) => builders.terminal(utils.forward(data), 'path'),

    /**
     * Processes the boolean keywords
     * @param {Array} data
     * @returns {AstBoolean}
     */
    boolean: (data) => builders.terminal(utils.forward(data), 'boolean'),

    /**
     * Processes the "undef" keyword
     * @param {Array} data
     * @returns {AstUndefined}
     */
    undef: (data) => builders.terminal(utils.forward(data), 'undefined'),

    /**
     * Processes an identifier
     * @param {Array} data
     * @returns {AstIdentifier}
     */
    identifier: (data) => builders.terminal(utils.forward(data), 'identifier'),

    /**
     * Processes a line comment
     * @param {Array} data
     * @returns {AstLineComment}
     */
    lineComment: (data) => builders.terminal(utils.forward(data), 'lineComment'),

    /**
     * Processes a block comment
     * @param {Array} data
     * @returns {AstBlockComment}
     */
    blockComment: (data) => builders.terminal(utils.forward(data), 'blockComment'),

    /**
     * Processes a unary operator
     * @param {Array} data
     * @returns {AstUnaryOperator}
     */
    unaryOperator: (data) => {
        data = _.isArray(data) ? _.flattenDeep(data) : data;
        if (data.length === 2) {
            let node = ast.unaryOperator(
                data[0].value,
                data[1]
            );
            node.startAt(utils.startPosition(data[0]));
            node.endAt(node.value);
            return node;
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes a binary operator
     * @param {Array} data
     * @returns {AstBinaryOperator}
     */
    binaryOperator: (data) => {
        data = _.isArray(data) ? _.flattenDeep(data) : data;
        if (data.length === 3) {
            let node = ast.binaryOperator(
                data[0],
                data[1].value,
                data[2]
            );
            node.startAt(node.left);
            node.endAt(node.right);
            return node;
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes an assignment
     * @param {Array} data
     * @returns {AstAssignment}
     */
    assignment: (data) => {
        data = _.isArray(data) ? _.flattenDeep(data) : data;
        if (data.length === 3) {
            let node = ast.assignment(
                data[0],
                data[2]
            );
            node.startAt(node.identifier);
            node.endAt(node.value);
            return node;
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes an include statement
     * @param {Array} data
     * @returns {AstInclude}
     */
    include: (data) => {
        data = _.isArray(data) ? _.flattenDeep(data) : data;
        if (data.length === 2) {
            let node = ast.include(
                data[1]
            );
            node.startAt(utils.startPosition(data[0]));
            node.endAt(node.path);
            return node;
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes a use statement
     * @param {Array} data
     * @returns {AstUse}
     */
    use: (data) => {
        data = _.isArray(data) ? _.flattenDeep(data) : data;
        if (data.length === 2) {
            let node = ast.use(
                data[1]
            );
            node.startAt(utils.startPosition(data[0]));
            node.endAt(node.path);
            return node;
        } else {
            return utils.forward(data)
        }
    },
};

module.exports = builders;