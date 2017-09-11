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
 * Defines a hub that provides access to all AST node classes.
 *
 * @package src/ast
 * @author jsconan
 */

/**
 * @type {AstNode}
 */
module.exports.AstNode = require('./classes/node');

/**
 * @type {AstPosition}
 */
module.exports.AstPosition = require('./classes/position');

/**
 * @type {AstFragment}
 */
module.exports.AstFragment = require('./classes/fragment');

/**
 * @type {AstLiteral}
 */
module.exports.AstLiteral = require('./classes/literal');

/**
 * @type {AstNumber}
 */
module.exports.AstNumber = require('./classes/number');

/**
 * @type {AstString}
 */
module.exports.AstString = require('./classes/string');

/**
 * @type {AstPath}
 */
module.exports.AstPath = require('./classes/path');

/**
 * @type {AstIdentifier}
 */
module.exports.AstIdentifier = require('./classes/identifier');

/**
 * @type {AstBoolean}
 */
module.exports.AstBoolean = require('./classes/boolean');

/**
 * @type {AstUndefined}
 */
module.exports.AstUndefined = require('./classes/undefined');

/**
 * @type {AstRange}
 */
module.exports.AstRange = require('./classes/range');

/**
 * @type {AstComment}
 */
module.exports.AstComment = require('./classes/comment');

/**
 * @type {AstLineComment}
 */
module.exports.AstLineComment = require('./classes/line-comment');

/**
 * @type {AstBlockComment}
 */
module.exports.AstBlockComment = require('./classes/block-comment');

/**
 * @type {AstUnaryOperator}
 */
module.exports.AstUnaryOperator = require('./classes/unary-operator');

/**
 * @type {AstBinaryOperator}
 */
module.exports.AstBinaryOperator = require('./classes/binary-operator');

/**
 * @type {AstTernaryOperator}
 */
module.exports.AstTernaryOperator = require('./classes/ternary-operator');

/**
 * @type {AstIfStatement}
 */
module.exports.AstIfStatement = require('./classes/if-statement');

/**
 * @type {AstForStatement}
 */
module.exports.AstForStatement = require('./classes/for-statement');

/**
 * @type {AstFunction}
 */
module.exports.AstFunction = require('./classes/function');

/**
 * @type {AstModule}
 */
module.exports.AstModule = require('./classes/module');

/**
 * @type {AstAssignment}
 */
module.exports.AstAssignment = require('./classes/assignment');

/**
 * @type {AstFunctionCall}
 */
module.exports.AstFunctionCall = require('./classes/function-call');

/**
 * @type {AstModuleCall}
 */
module.exports.AstModuleCall = require('./classes/module-call');

/**
 * @type {AstExpression}
 */
module.exports.AstExpression = require('./classes/expression');

/**
 * @type {AstLookup}
 */
module.exports.AstLookup = require('./classes/lookup');

/**
 * @type {AstMemberLookup}
 */
module.exports.AstMemberLookup = require('./classes/member-lookup');

/**
 * @type {AstArrayLookup}
 */
module.exports.AstArrayLookup = require('./classes/array-lookup');

/**
 * @type {AstInclude}
 */
module.exports.AstInclude = require('./classes/include');

/**
 * @type {AstUse}
 */
module.exports.AstUse = require('./classes/use');

/**
 * @type {AstGroup}
 */
module.exports.AstGroup = require('./classes/group');

/**
 * @type {AstBlock}
 */
module.exports.AstBlock = require('./classes/block');

/**
 * @type {AstPackage}
 */
module.exports.AstPackage = require('./classes/package');

/**
 * @type {AstNoop}
 */
module.exports.AstNoop = require('./classes/noop');
