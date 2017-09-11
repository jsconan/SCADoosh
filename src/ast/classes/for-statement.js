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
 * Defines an AST node that represents a for statement.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a for statement.
 * @typedef {AstFragment} AstForStatement
 * @property {String} type
 * @property {AstFragment} init
 * @property {AstFragment} condition
 * @property {AstFragment} increment
 * @property {AstFragment} body
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstForStatement extends AstFragment {
    /**
     * Creates an AstForStatement.
     * @param {AstFragment} init
     * @param {AstFragment} condition
     * @param {AstFragment} increment
     * @param {AstFragment} body
     * @param {Object} [properties] - An optional list of additional properties to set.
     * @throws {TypeError} if one of the operands is not a valid AstFragment
     */
    constructor(init, condition, increment, body, properties) {
        super(_.assign({
            type: 'for-statement',
            init: init,
            condition: condition,
            increment: increment,
            body: body
        }, properties));
    }

    /**
     * Transforms the properties before assign them to the node.
     * @param {Object} properties - The properties to transform
     * @returns {Object}
     * @throws {TypeError} if the properties are invalid
     */
    mapProperties(properties) {
        if (!AstFragment.validate(properties.init)) {
            throw new TypeError('The init block should be an AstFragment!');
        }

        if (!AstFragment.validate(properties.condition)) {
            throw new TypeError('The condition should be an AstFragment!');
        }

        if (!AstFragment.validate(properties.increment)) {
            throw new TypeError('The increment block should be an AstFragment!');
        }

        if (!AstFragment.validate(properties.body)) {
            throw new TypeError('The body be an AstFragment!');
        }

        return super.mapProperties(properties);
    }
}

module.exports = AstForStatement;
