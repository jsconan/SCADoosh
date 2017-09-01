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
 * Defines an AST node that represents a unary operator.
 *
 * @package src/ast
 * @author jsconan
 */

const AstNode = require('./node');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a unary operator.
 * @typedef {AstFragment} AstUnaryOperator
 * @property {String} type
 * @property {String} operator
 * @property {AstNode} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstUnaryOperator extends AstFragment {
    /**
     * Creates an AstUnaryOperator.
     * @param {String} operator
     * @param {AstNode} value
     * @throws {TypeError} if the operand is not a valid AstNode
     */
    constructor(operator, value) {
        if (!AstNode.validate(value)) {
            throw new TypeError('The operand should be an AstNode!');
        }
        super({
            type: 'unaryOperator',
            operator: operator,
            value: value
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstUnaryOperator}
     * @throws {TypeError} if the operand is not a valid AstNode
     */
    clone(properties) {
        if (properties && typeof properties.value !== 'undefined') {
            if (!AstNode.validate(properties.value)) {
                throw new TypeError('The operand should be an AstNode!');
            }
        }

        return super.clone(properties);
    }
}

module.exports = AstUnaryOperator;
