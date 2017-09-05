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
const classes = require('./classes');

const builders = {
    /**
     * Creates a terminal node from the provided token and class.
     * Set the fragment position according to the provided token.
     * @param {Token} token - The token that represents the terminal
     * @param {Function|String} AstClass - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     * @throws {TypeError} if the created node is not an AstFragment or if the AstClass is not valid
     */
    terminal: (token, AstClass) => {
        const Class = utils.getClass(AstClass);
        const node = new Class(token.value);

        if (!utils.is(node, classes.AstFragment)) {
            throw new TypeError('A terminal should be at least an AstFragment');
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
    number: (data) => builders.terminal(utils.forward(data), 'AstNumber'),

    /**
     * Processes a string
     * @param {Array} data
     * @returns {AstString}
     */
    string: (data) => builders.terminal(utils.forward(data), 'AstString'),

    /**
     * Processes a path
     * @param {Array} data
     * @returns {AstPath}
     */
    path: (data) => builders.terminal(utils.forward(data), 'AstPath'),

    /**
     * Processes the boolean keywords
     * @param {Array} data
     * @returns {AstBoolean}
     */
    boolean: (data) => builders.terminal(utils.forward(data), 'AstBoolean'),

    /**
     * Processes the "undef" keyword
     * @param {Array} data
     * @returns {AstUndefined}
     */
    undef: (data) => builders.terminal(utils.forward(data), 'AstUndefined'),

    /**
     * Processes an identifier
     * @param {Array} data
     * @returns {AstIdentifier}
     */
    identifier: (data) => builders.terminal(utils.forward(data), 'AstIdentifier'),

    /**
     * Processes a line comment
     * @param {Array} data
     * @returns {AstLineComment}
     */
    lineComment: (data) => builders.terminal(utils.forward(data), 'AstLineComment'),

    /**
     * Processes a block comment
     * @param {Array} data
     * @returns {AstBlockComment}
     */
    blockComment: (data) => builders.terminal(utils.forward(data), 'AstBlockComment'),

    /**
     * Processes a unary operator
     * @param {Array} data
     * @returns {AstUnaryOperator}
     */
    unaryOperator: (data) => {
        data = _.isArray(data) ? _.flattenDeep(data) : data;
        if (data.length === 2) {
            let node = new classes.AstUnaryOperator(
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
            let node = new classes.AstBinaryOperator(
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
            let node = new classes.AstAssignment(
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
            let node = new classes.AstInclude(
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
            let node = new classes.AstUse(
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
     * Processes a block of statements
     * @param {Array} data
     * @returns {AstBlock}
     */
    block: (data) => {
        data = _.isArray(data) ? _.flattenDeep(data) : data;
        if (data.length > 1) {
            let node = new classes.AstBlock(data.slice(1, -1));
            node.startAt(utils.startPosition(data[0]));
            node.endAt(utils.startPosition(data[data.length - 1]));
            return node;
        } else {
            return utils.forward(data)
        }
    },
};

module.exports = builders;