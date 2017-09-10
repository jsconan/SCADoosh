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
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if one of the values is not a valid AstFragment
     */
    constructor(first, step, last, properties) {
        if (typeof last === 'undefined') {
            last = step;
            step = null;
        }

        super(_.assign({
            type: 'range',
            first: first,
            step: step,
            last: last,
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        if (!AstFragment.validate(properties.first) ||
            (typeof properties.step !== 'undefined' && properties.step !== null && !AstFragment.validate(properties.step)) ||
            !AstFragment.validate(properties.last)) {
            throw new TypeError('The value should be an AstFragment!');
        }
        return _.omitBy(properties, _.isNull);
    }
}

module.exports = AstRange;
