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
 * Defines an AST node that represents an array lookup.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const AstIdentifier = require('./identifier');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents an array lookup.
 * @typedef {AstFragment} AstArrayLookup
 * @property {String} type
 * @property {AstFragment} array
 * @property {AstFragment} index
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstArrayLookup extends AstFragment {
    /**
     * Creates an AstArrayLookup.
     * @param {AstFragment} array
     * @param {AstFragment} index
     * @throws {TypeError} if the array or the index is not a valid AstFragment
     */
    constructor(array, index) {
        if (!AstFragment.validate(array)) {
            throw new TypeError('The array should be an AstFragment!');
        }
        if (!AstFragment.validate(index)) {
            throw new TypeError('The index should be an AstFragment!');
        }
        super({
            type: 'array-lookup',
            array: array,
            index: index,
        });
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstArrayLookup}
     * @throws {TypeError} if the array or the index is not a valid AstFragment
     */
    clone(properties) {
        if (properties) {
            if (typeof properties.array !== 'undefined' && !AstFragment.validate(properties.array)) {
                throw new TypeError('The array should be an AstFragment!');
            }
            if (typeof properties.index !== 'undefined' && !AstFragment.validate(properties.index)) {
                throw new TypeError('The index should be an AstFragment!');
            }
        }

        return super.clone(properties);
    }
}

module.exports = AstArrayLookup;
