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
        AstUnaryOperator: AstUnaryOperator
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
