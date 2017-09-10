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
 * Defines an AST node that represents a language literal.
 *
 * @package src/ast/classes
 * @author jsconan
 */

const _ = require('lodash');
const AstFragment = require('./fragment');

/**
 * Defines an AST node that represents a language literal.
 * @typedef {AstFragment} AstLiteral
 * @property {String} type
 * @property {*} value
 * @property {AstPosition} start
 * @property {AstPosition} end
 */
class AstLiteral extends AstFragment {
    /**
     * Creates an AstLiteral.
     * @param {String} type
     * @param {*} value
     * @param {Object} [properties] - An optional list of additional properties to set.
     */
    constructor(type, value, properties) {
        super(_.assign({
            type: type,
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
        properties.value = this.cast(properties.value);
        return super.mapProperties(properties);
    }

    /**
     * Cast the value to the type handled by the node.
     * The inherited classes should override this method
     * @param {*} value
     * @returns {*}
     * @throws {TypeError} if the value is invalid
     */
    cast(value) {
        return value;
    }
}

module.exports = AstLiteral;
