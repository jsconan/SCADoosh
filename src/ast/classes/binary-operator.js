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
 * Defines an AST node that represents a binary operator.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a binary operator.
 * @typedef {AstFragment} AstBinaryOperator
 * @property {String} type
 * @property {String} operator
 * @property {AstFragment} left
 * @property {AstFragment} right
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstBinaryOperator extends AstFragment {
    /**
     * Creates an AstBinaryOperator.
     * @param {AstFragment} left
     * @param {String} operator
     * @param {AstFragment} right
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if one of the operands is not a valid AstFragment
     */
    constructor(left, operator, right, properties) {
        super(_.assign({
            type: 'BinaryOperator',
            operator: operator,
            left: left,
            right: right
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        if (!AstFragment.validate(properties.left) || !AstFragment.validate(properties.right)) {
            throw new TypeError('An operand should be an AstFragment!');
        }
        properties.operator = '' + properties.operator;
        return super.mapProperties(properties);
    }
}

module.exports = AstBinaryOperator;
