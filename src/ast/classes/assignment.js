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
 * Defines an AST node that represents an assignment.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const AstIdentifier = require('./identifier');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents an assignment.
 * @typedef {AstFragment} AstAssignment
 * @property {String} type
 * @property {AstIdentifier} identifier
 * @property {AstFragment} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstAssignment extends AstFragment {
    /**
     * Creates an AstAssignment.
     * @param {AstIdentifier} identifier
     * @param {AstFragment} value
     * @throws {TypeError} if the identifier is not an AstIdentifier, or if the value is not a valid AstFragment
     */
    constructor(identifier, value) {
        if (!AstIdentifier.validate(identifier)) {
            throw new TypeError('The identifier should be an AstIdentifier!');
        }
        if (!AstFragment.validate(value)) {
            throw new TypeError('The value should be an AstFragment!');
        }
        super({
            type: 'assignment',
            identifier: identifier,
            value: value
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstAssignment}
     * @throws {TypeError} if the identifier is not an AstIdentifier, or if the value is not a valid AstFragment
     */
    clone(properties) {
        if (properties) {
            if (typeof properties.identifier !== 'undefined' && !AstIdentifier.validate(properties.identifier)) {
                throw new TypeError('The identifier should be an AstIdentifier!');
            }
            if (typeof properties.value !== 'undefined' && !AstFragment.validate(properties.value)) {
                throw new TypeError('The value should be an AstFragment!');
            }
        }

        return super.clone(properties);
    }
}

module.exports = AstAssignment;
