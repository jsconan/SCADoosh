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
 * Defines an AST node that represents a ternary operator.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a ternary operator.
 * @typedef {AstFragment} AstTernaryOperator
 * @property {String} type
 * @property {AstFragment} condition
 * @property {AstFragment} consequent
 * @property {AstFragment} alternative
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstTernaryOperator extends AstFragment {
    /**
     * Creates an AstTernaryOperator.
     * @param {AstFragment} condition
     * @param {AstFragment} consequent
     * @param {AstFragment} alternative
     * @throws {TypeError} if one of the operands is not a valid AstFragment
     */
    constructor(condition, consequent, alternative) {
        if (!AstFragment.validate(condition) || !AstFragment.validate(consequent) || !AstFragment.validate(alternative)) {
            throw new TypeError('An operand should be an AstFragment!');
        }
        super({
            type: 'ternaryOperator',
            condition: condition,
            consequent: consequent,
            alternative: alternative
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstTernaryOperator}
     * @throws {TypeError} if one of the operands is not a valid AstFragment
     */
    clone(properties) {
        if (properties) {
            let error = false;
            if (typeof properties.condition !== 'undefined') {
                error = error || !AstFragment.validate(properties.condition);
            }
            if (typeof properties.consequent !== 'undefined') {
                error = error || !AstFragment.validate(properties.consequent);
            }
            if (typeof properties.alternative !== 'undefined') {
                error = error || !AstFragment.validate(properties.alternative);
            }
            if (error) {
                throw new TypeError('An operand should be an AstFragment!');
            }
        }

        return super.clone(properties);
    }
}

module.exports = AstTernaryOperator;
