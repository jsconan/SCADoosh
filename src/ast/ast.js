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
 * Defines a hub that provides factories to create final AST nodes.
 *
 * @package src/ast
 * @author jsconan
 */

const _ = require('lodash');
const splitLines = require('./../utils/split-lines');

const AstNode = require('./node');
const AstPosition = require('./position');
const AstFragment = require('./fragment');
const AstLiteral = require('./literal');
const AstNumber = require('./number');
const AstString = require('./string');
const AstPath = require('./path');
const AstIdentifier = require('./identifier');
const AstBoolean = require('./boolean');
const AstTrue = require('./true');
const AstFalse = require('./false');
const AstUndefined = require('./undefined');
const AstComment = require('./comment');
const AstLineComment = require('./line-comment');
const AstBlockComment = require('./block-comment');
const AstBinaryOperator = require('./binary-operator');
const AstUnaryOperator = require('./unary-operator');

/**
 * Hub that provides factories to create final AST nodes.
 * @type {Object}
 */
const ast = {
    /**
     * List all the available AST node classes
     * @type {Object}
     */
    nodes: {
        AstNode: AstNode,
        AstPosition: AstPosition,
        AstFragment: AstFragment,
        AstLiteral: AstLiteral,
        AstNumber: AstNumber,
        AstString: AstString,
        AstPath: AstPath,
        AstIdentifier: AstIdentifier,
        AstBoolean: AstBoolean,
        AstTrue: AstTrue,
        AstFalse: AstFalse,
        AstUndefined: AstUndefined,
        AstComment: AstComment,
        AstLineComment: AstLineComment,
        AstBlockComment: AstBlockComment,
        AstBinaryOperator: AstBinaryOperator,
        AstUnaryOperator: AstUnaryOperator
    },

    /**
     * Utility helpers
     * @type {Object}
     */
    utils: {
        /**
         * Checks if an object is an instance of an AST node.
         * @param {Object} node
         * @param {Function|String} AstClass
         * @returns {Boolean}
         */
        is: (node, AstClass) => {
            if (typeof AstClass === 'string') {
                AstClass = ast.nodes[AstClass] || _.noop;
            }
            return typeof node === 'object' && node instanceof AstClass;
        },

        /**
         * Forwards the token position into the provided AstFragment as a start position
         * @param {Object} token
         * @param {AstFragment} node
         * @returns {AstFragment}
         * @throws {TypeError} if the node is not an AstFragment
         */
        tokenStart: (token, node) => {
            if (!ast.utils.is(node, AstFragment)) {
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
            if (!ast.utils.is(node, AstFragment)) {
                throw new TypeError('An AstFragment node is needed to set the position');
            }

            const value = token.value;
            const lines = splitLines(value);
            const breaks = lines.length - 1;
            const col = breaks ? 1 + lines[breaks].length : token.col + value.length;
            return node.endAt(token.line + breaks, col, token.offset + value.length);
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
                    throw new TypeError(`Only a single element can be forwarded, ${data.length} elements found!`);
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
        ast.utils.tokenStart(token, node);
        ast.utils.tokenEnd(token, node);
        return node;
    },

    /**
     * Creates an AstNumber node.
     * @param {Number|String} value
     */
    number: (value) => new AstNumber(value),

    /**
     * Creates an AstString node.
     * @param {String} value
     */
    string: (value) => new AstString(value),

    /**
     * Creates an AstPath node.
     * @param {String} value
     */
    path: (value) => new AstPath(value),

    /**
     * Creates an AstIdentifier node.
     * @param {String} value
     */
    identifier: (value) => new AstIdentifier(value),

    /**
     * Creates an AstBoolean node.
     * @param {Boolean|String} value
     */
    boolean: (value) => new AstBoolean(value),

    /**
     * Creates an AstUndefined node.
     */
    undefined: () => new AstUndefined(),

    /**
     * Creates an AstLineComment node.
     * @param {String} value
     */
    lineComment: (value) => new AstLineComment(value),

    /**
     * Creates an AstBlockComment node.
     * @param {String} value
     */
    blockComment: (value) => new AstBlockComment(value),

    /**
     * Creates an AstBinaryOperator node.
     * @param {String} operator
     * @param {AstNode} leftValue
     * @param {AstNode} rightValue
     */
    binaryOperator: (leftValue, operator, rightValue) => new AstBinaryOperator(leftValue, operator, rightValue),

    /**
     * Creates an AstUnaryOperator node.
     * @param {String} operator
     * @param {AstNode} value
     */
    unaryOperator: (operator, value) => new AstUnaryOperator(operator, value)
};

module.exports = ast;