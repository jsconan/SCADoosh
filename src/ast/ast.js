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
 * Defines a hub that provides access to all AST node classes, and provides factories to create final AST nodes.
 *
 * @package src/ast
 * @author jsconan
 */

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
const AstAssignment = require('./assignment');
const AstInclude = require('./include');
const AstUse = require('./use');

/**
 * Hub that provides factories to create final AST nodes.
 * @type {Object}
 */
module.exports = {
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
        AstUnaryOperator: AstUnaryOperator,
        AstAssignment: AstAssignment,
        AstInclude: AstInclude,
        AstUse: AstUse,
    },

    /**
     * Creates an AstNumber node.
     * @param {Number|String} value
     * @returns {AstNumber}
     */
    number: (value) => new AstNumber(value),

    /**
     * Creates an AstString node.
     * @param {String} value
     * @returns {AstString}
     */
    string: (value) => new AstString(value),

    /**
     * Creates an AstPath node.
     * @param {String} value
     * @returns {AstPath}
     */
    path: (value) => new AstPath(value),

    /**
     * Creates an AstIdentifier node.
     * @param {String} value
     * @returns {AstIdentifier}
     */
    identifier: (value) => new AstIdentifier(value),

    /**
     * Creates an AstBoolean node.
     * @param {Boolean|String} value
     * @returns {AstBoolean}
     */
    boolean: (value) => new AstBoolean(value),

    /**
     * Creates an AstUndefined node.
     * @returns {AstUndefined}
     */
    undefined: () => new AstUndefined(),

    /**
     * Creates an AstLineComment node.
     * @param {String} value
     * @returns {AstLineComment}
     */
    lineComment: (value) => new AstLineComment(value),

    /**
     * Creates an AstBlockComment node.
     * @param {String} value
     * @returns {AstBlockComment}
     */
    blockComment: (value) => new AstBlockComment(value),

    /**
     * Creates an AstBinaryOperator node.
     * @param {String} operator
     * @param {AstNode} left
     * @param {AstNode} right
     * @returns {AstBinaryOperator}
     */
    binaryOperator: (left, operator, right) => new AstBinaryOperator(left, operator, right),

    /**
     * Creates an AstUnaryOperator node.
     * @param {String} operator
     * @param {AstNode} value
     * @returns {AstUnaryOperator}
     */
    unaryOperator: (operator, value) => new AstUnaryOperator(operator, value),

    /**
     * Creates an AstAssignment node.
     * @param {AstIdentifier} identifier
     * @param {AstNode} value
     * * @returns {AstAssignment}
     */
    assignment: (identifier, value) => new AstAssignment(identifier, value),

    /**
     * Creates an AstInclude node.
     * @param {AstPath} path
     * @returns {AstInclude}
     */
    include: (path) => new AstInclude(path),

    /**
     * Creates an AstUse node.
     * @param {AstPath} path
     * @returns {AstUse}
     */
    use: (path) => new AstUse(path)
};
