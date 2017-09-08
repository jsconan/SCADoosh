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

const utils = require('./utils');
const classes = require('./classes');

const builders = {
    /**
     * Creates a terminal node from the provided data and class.
     * Set the fragment position according to the provided token.
     * @param {Array|Token|AstNode} data - The data provided by the parser
     * @param {Function|String} AstClass - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     * @throws {TypeError} if there is more than one token
     * @throws {TypeError} if if the AstClass is not valid
     * @throws {TypeError} if the created node is not an AstFragment
     */
    terminal: (data, AstClass) => {
        data = utils.flatten(data);

        if (!data.length || data.length > 1) {
            throw new TypeError('A terminal should be represented by a single token');
        }

        const token = data[0];

        if (utils.is(token, AstClass)) {
            return token;
        }

        const Class = utils.getClass(AstClass);
        const node = new Class(token.value);

        if (!utils.is(node, classes.AstFragment)) {
            throw new TypeError('A terminal should be at least an AstFragment');
        }

        return utils.setPosition(node, data);
    },

    /**
     * Processes a unary operator
     * @param {Array} data - The data provided by the parser
     * @param {Function|String} [AstClass] - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     */
    unaryOperator: (data, AstClass = 'AstUnaryOperator') => {
        data = utils.flatten(data);
        if (data.length === 2) {
            const Class = utils.getClass(AstClass);
            const node = new Class(
                data[0].value,
                data[1]
            );
            return utils.setPosition(node, data);
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes a binary operator
     * @param {Array} data - The data provided by the parser
     * @param {Function|String} [AstClass] - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     */
    binaryOperator: (data, AstClass = 'AstBinaryOperator') => {
        data = utils.flatten(data);
        if (data.length === 3) {
            const Class = utils.getClass(AstClass);
            const node = new Class(
                data[0],
                data[1].value,
                data[2]
            );
            return utils.setPosition(node, data);
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes a ternary operator
     * @param {Array} data - The data provided by the parser
     * @param {Function|String} [AstClass] - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     */
    ternaryOperator: (data, AstClass = 'AstTernaryOperator') => {
        data = utils.flatten(data);
        if (data.length === 5) {
            const Class = utils.getClass(AstClass);
            const node = new Class(
                data[0],
                data[2],
                data[4]
            );
            return utils.setPosition(node, data);
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes an assignment
     * @param {Array} data - The data provided by the parser
     * @param {Function|String} [AstClass] - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     */
    assignment: (data, AstClass = 'AstAssignment') => {
        data = utils.flatten(data);
        if (data.length === 3) {
            const Class = utils.getClass(AstClass);
            const node = new Class(
                data[0],
                data[2]
            );
            return utils.setPosition(node, data);
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes a command statement
     * @param {Array} data - The data provided by the parser
     * @param {Function|String} AstClass - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     */
    command: (data, AstClass) => {
        data = utils.flatten(data);
        if (data.length === 2) {
            const Class = utils.getClass(AstClass);
            const node = new Class(
                data[1],
                data[0].value
            );
            return utils.setPosition(node, data);
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes a surrounded list of statements
     * @param {Array} data - The data provided by the parser
     * @param {Function|String} [AstClass] - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     */
    block: (data, AstClass = 'AstBlock') => {
        data = utils.flatten(data);
        if (data.length > 1) {
            const Class = utils.getClass(AstClass);
            const node = new Class(data.slice(1, -1));
            return utils.setPosition(node, data);
        } else {
            return utils.forward(data)
        }
    },

    /**
     * Processes a list of statements
     * @param {Array} data - The data provided by the parser
     * @param {Function|String} [AstClass] - The AstNode class or the name of an AST node class
     * @returns {AstFragment|null}
     */
    list: (data, AstClass = 'AstBlock') => {
        data = utils.flatten(data);
        if (data.length) {
            const Class = utils.getClass(AstClass);
            if (data.length === 1 && utils.is(data[0], AstClass)) {
                return utils.forward(data);
            }
            return utils.setPosition(new Class(data), data);
        }
        return null;
    },

    /**
     * Processes an empty statement
     * @param {Array} data - The data provided by the parser
     * @param {Function|String} [AstClass] - The AstNode class or the name of an AST node class
     * @returns {AstFragment}
     */
    noop: (data, AstClass = 'AstNoop') => {
        data = utils.flatten(data);
        const Class = utils.getClass(AstClass);
        if (data.length === 1 && utils.is(data[0], AstClass)) {
            return utils.forward(data);
        }
        return utils.setPosition(new Class(data), data);
    },
};

module.exports = builders;