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
     * @throws {TypeError} if one of the operands is not a valid AstFragment
     */
    constructor(left, operator, right) {
        if (!AstFragment.validate(left) || !AstFragment.validate(right)) {
            throw new TypeError('An operand should be an AstFragment!');
        }
        super({
            type: 'binaryOperator',
            operator: operator,
            left: left,
            right: right
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstBinaryOperator}
     * @throws {TypeError} if one of the operands is not a valid AstFragment
     */
    clone(properties) {
        if (properties) {
            let error = false;
            if (typeof properties.left !== 'undefined') {
                error = error || !AstFragment.validate(properties.left);
            }
            if (typeof properties.right !== 'undefined') {
                error = error || !AstFragment.validate(properties.right);
            }
            if (error) {
                throw new TypeError('An operand should be an AstFragment!');
            }
        }

        return super.clone(properties);
    }
}

module.exports = AstBinaryOperator;
