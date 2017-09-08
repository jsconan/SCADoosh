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
 * Defines an AST node that represents a range.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a range.
 * @typedef {AstFragment} AstRange
 * @property {String} type
 * @property {AstFragment} first
 * @property {AstFragment} [step]
 * @property {AstFragment} last
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstRange extends AstFragment {
    /**
     * Creates an AstRange.
     * @param {AstFragment} first
     * @param {AstFragment} [step]
     * @param {AstFragment} last
     * @throws {TypeError} if one of the values is not a valid AstFragment
     */
    constructor(first, step, last) {
        const properties = {
            type: 'range',
            first: first,
            step: step,
            last: last,
        };

        if (typeof last === 'undefined') {
            properties.last = step;
            properties.step = null;
        }

        if (!AstFragment.validate(properties.first) ||
            (properties.step !== null && !AstFragment.validate(properties.step)) ||
            !AstFragment.validate(properties.last)) {
            throw new TypeError('The value should be an AstFragment!');
        }

        super(_.omitBy(properties, _.isNull));
    }

    /**
     * Clones the instance.
     * @param {Object} [properties] - an optional list of additional properties to set.
     * @returns {AstRange}
     * @throws {TypeError} if one of the values is not a valid AstFragment
     */
    clone(properties) {
        if (properties) {
            if ((typeof properties.first !== 'undefined' && !AstFragment.validate(properties.first)) ||
                (typeof properties.step !== 'undefined' && !AstFragment.validate(properties.step)) ||
                (typeof properties.last !== 'undefined' && !AstFragment.validate(properties.last))) {
                throw new TypeError('The value should be an AstFragment!');
            }
        }

        return super.clone(_.omitBy(properties, _.isNull));
    }
}

module.exports = AstRange;
