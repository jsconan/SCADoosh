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
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a unary operator.
 * @typedef {AstFragment} AstUnaryOperator
 * @property {String} type
 * @property {String} operator
 * @property {AstFragment} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstUnaryOperator extends AstFragment {
    /**
     * Creates an AstUnaryOperator.
     * @param {String} operator
     * @param {AstNode} value
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if the operand is not a valid AstFragment
     */
    constructor(operator, value, properties) {
        super(_.assign({
            type: 'UnaryOperator',
            operator: operator,
            value: value
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        if (!AstFragment.validate(properties.value)) {
            throw new TypeError('The operand should be an AstFragment!');
        }
        properties.operator = '' + properties.operator;
        return super.mapProperties(properties);
    }
}

module.exports = AstUnaryOperator;
